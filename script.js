// Prepare the 'users' module for subsequent registration of controllers and delegates

angular.module('users', [ 'ngMaterial' ])

    .config(function($sceProvider) {
    // ngMaterial $mdIconProvider will be updated  to mark urls as safe.
    // Meanwhile, disable $sce for ngMaterial CodePen Demos that using external SVGs
    $sceProvider.enabled(false);
    })

     .controller('UserController', ['userService', '$mdBottomSheet', UserController ])
     .service('userService', ['$q', UserService]);

// Users Controller for the Angular Material Start

function UserController( userService, $mdBottomSheet ) {
    var self = this;

    self.selected     = null;
    self.users        = [ ];
    self.selectUser   = selectUser;
    self.makeContact  = makeContact;

    // Load all registered users

    userService
          .loadAllUsers()
          .then( function( users ) {
            self.users    = [].concat(users);
            self.selected = users[0];
          });

    // *********************************
    // Internal methods
    // *********************************

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectUser ( user ) {
      self.selected =  user;
    }

    /**
     * Show the bottom sheet
     */
    function makeContact(selectedUser) {
        var appRoot = 'https://rawgit.com/angular/material-start/es5-tutorial/app/';

        $mdBottomSheet.show({
          controllerAs     : "vm",
          controller       : [ '$mdBottomSheet', ContactSheetController],
          templateUrl      : appRoot + 'src/users/view/contactSheet.html',
          parent           : angular.element(document.getElementById('content'))
        });

         /**
          * Bottom Sheet controller for the Avatar Actions
          */
         function ContactSheetController( $mdBottomSheet ) {
           var rootURL = appRoot + "assets/svg/";

           this.user = selectedUser;
           this.items = [
             { name: 'Phone'       , icon: 'phone'       , icon_url: rootURL + 'phone.svg'},
             { name: 'Twitter'     , icon: 'twitter'     , icon_url: rootURL + 'twitter.svg'},
             { name: 'Google+'     , icon: 'google_plus' , icon_url: rootURL + 'google_plus.svg'},
             { name: 'Hangout'     , icon: 'hangouts'    , icon_url: rootURL + 'hangouts.svg'}
           ];
           this.contactUser = function(action) {
             // The actually contact process has not been implemented...
             // so just hide the bottomSheet

             $mdBottomSheet.hide(action);
           };
         }
    }

  }



// Users DataService

function UserService($q){
  var users = [
    {
      name: 'Lia Lugo',
      avatar: 'svg-1',
      content: 'I love cheese, especially airedale queso. Cheese and biscuits halloumi cauliflower cheese cottage cheese swiss boursin fondue caerphilly. Cow port-salut camembert de normandie macaroni cheese feta who moved my cheese babybel boursin. Red leicester roquefort boursin squirty cheese jarlsberg blue castello caerphilly chalk and cheese. Lancashire.'
    },
    {
      name: 'George Duke',
      avatar: 'svg-2',
      content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.'
    },
    {
      name: 'Gener Delosreyes',
      avatar: 'svg-3',
      content: "Raw denim pour-over readymade Etsy Pitchfork. Four dollar toast pickled locavore bitters McSweeney's blog. Try-hard art party Shoreditch selfies. Odd Future butcher VHS, disrupt pop-up Thundercats chillwave vinyl jean shorts taxidermy master cleanse letterpress Wes Anderson mustache Helvetica. Schlitz bicycle rights chillwave irony lumberhungry Kickstarter next level sriracha typewriter Intelligentsia, migas kogi heirloom tousled. Disrupt 3 wolf moon lomo four loko. Pug mlkshk fanny pack literally hoodie bespoke, put a bird on it Marfa messenger bag kogi VHS."
    },
    {
      name: 'Lawrence Ray',
      avatar: 'svg-4',
      content: 'Scratch the furniture spit up on light gray carpet instead of adjacent linoleum so eat a plant, kill a hand pelt around the house and up and down stairs chasing phantoms run in circles, or claw drapes. Always hungry pelt around the house and up and down stairs chasing phantoms.'
    },
    {
      name: 'Ernesto Urbina',
      avatar: 'svg-5',
      content: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo. Bubbli greplin stypi prezi mzinga heroku wakoopa, shopify airbnb dogster dopplr gooru jumo, reddit plickers edmodo stypi zillow etsy.'
    },
    {
      name: 'Gani Ferrer',
      avatar: 'svg-6',
      content: "Lebowski ipsum yeah? What do you think happens when you get rad? You turn in your library card? Get a new driver's license? Stop being awesome? Dolor sit amet, consectetur adipiscing elit praesent ac magna justo pellentesque ac lectus. You don't go out and make a living dressed like that in the middle of a weekday. Quis elit blandit fringilla a ut turpis praesent felis ligula, malesuada suscipit malesuada."
    }
  ];

  // Promise-based API
  return {
    loadAllUsers : function() {
      // Simulate async nature of real remote calls
      return $q.when(users);
    }
  };
}
