var model = {
      getAllUsers : function(){
                  var usersQuery = firebase.database().ref('Users');
                  usersQuery.on('value',function(snapshot){

                   snapshot.forEach(function(childSnapshot)
                   {
                       console.log('User : '+childSnapshot.val().name);
                       presenter.appendUser(childSnapshot.val());
                   })
                 },function(error){
                      console.log("error while fetching users "+error);
                      presenter.fetchUsersError(error);
                 });
            }
};
var presenter = {

    fetchUsers : function(){
                    console.log("Users requested");
                    view.showLoading();
                    model.getAllUsers();
    },
    fetchUsersError : function(error){
                    view.showError(error);
    },
    appendUser : function(user){
                    console.log("User is being appended : "+user.name);
                    view.showUsers();
                    view.appendUser(user);
    },
    imageButtonClicked : function(image){
                /*    sessionStorage.currentPassage = passageString;
                    window.location = "typing.html"; */
                    window.open(image);
    },
    logout : function(){
                    logout();
    },
    getCurrentUser : function(){
                     console.log('Current user is : '+getCurrentUser());
                     view.setHeaderEmail(getCurrentUser());
    }
};
var view = {
    init : function(){
            usersElement = document.getElementById('users');
            userLoaderElem = document.getElementById('loaderUser');
            headerUserElem = document.getElementById('user_email');
            logOutButton = document.getElementById('signout');
            logOutButton.addEventListener('click',function(){
                          presenter.logout();
            });
            presenter.getCurrentUser();
            presenter.fetchUsers();
    },
    appendUser : function(user){
                    console.log('User : '+user.name);

                    var name = user.name;
                    var email = user.email;
                    var contactNumber = user.contact_number;
                    var rollNo = user.roll_no;
                    var image = user.imager_url;

                    var rowdiv = document.createElement('div');
                    rowdiv.className = 'row user';
                    var coldiv = document.createElement('div');

                    coldiv.className = 'col-md-2';
                    coldiv.innerHTML = "<button class='showImageButton'>Show Image</button>";

                    rowdiv.innerHTML= "<div class='col-md-3'>"
                                             +name+
                                       "</div>"+
                                       "<div class='col-md-3'>"
                                             +email+
                                       "</div>"+
                                       "<div class='col-md-2'>"
                                             +contactNumber+
                                       "</div>"+
                                       "<div class='col-md-2'>"
                                             +rollNo+
                                       "</div>";

                  coldiv.onclick = view.createClickHandler(image);

                  rowdiv.append(coldiv);
                  usersElement.append(rowdiv);

    },
    showLoading : function(){
                  userLoaderElem.style.display = "block";
                  usersElement.style.display = 'none';

    },
    showUsers : function(){
                  userLoaderElem.style.display = "none";
                  usersElement.style.display = 'block';
    },
    showError : function(error){
            console.log("Error while fetching users "+error);
    },
    createClickHandler : function(arg)
    {
      return function()
      {
        console.log('Image button clicked'+arg);
        presenter.imageButtonClicked(arg);
        //redirect to typing page
        //document.getElementById('a').innerHTML = arg;
        //showTest();
      } ;
    },
    setHeaderEmail : function(email){
          headerUserElem.innerText = email;
    }
};

view.init();
