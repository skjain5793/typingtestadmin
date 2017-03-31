var model = {
      addUser : function(username,password)
               {
                     firebase.auth().createUserWithEmailAndPassword(username, password)
                     .then(function(){
                          presenter .registrationSuccess();
                     })
                     .catch(function(error) {
                          presenter .registrationError(error);
                     });
              }
};

var presenter = {

    registerUser : function(username,password){
                        if(username=="")
                          {
                              view.showError("Enter username");
                              return;
                          }
                          else
                          {
                              view.showLoading();
                              model.addUser(username,password);
                          }
                  },
    registrationError    : function(error){
                          view.showError(error);
                  },
    registrationSuccess  : function(email){
                          view.showSuccessDiv();
                  },
    getCurrentUser : function(){
                          console.log('Current user is : '+getCurrentUser());
                          view.setHeaderEmail(getCurrentUser());
                  },
    logout        : function(){
                          logout();
    }

};

var view = {
    init : function(){

             userRegistrationElement = document.getElementById('userRegistrationDiv');
             errorElements = document.getElementById('addUserError');
             usernameBox = document.getElementById('username');
             passwordBox = document.getElementById('password');

             loadingElement = document.getElementById('loading');

             successElement = document.getElementById('successDiv');

             userRegistrationForm = document.getElementById('userRegistrationForm');


             userRegistrationForm.onsubmit = function(e){
                        e.preventDefault();
                        console.log(usernameBox.value);
                        presenter.registerUser(usernameBox.value,passwordBox.value);
                        return false;
            };

            headerUserElem = document.getElementById('user_email');
            logOutButton = document.getElementById('signout');
            logOutButton.addEventListener('click',function(){
                          presenter.logout();
            });
            presenter.getCurrentUser();

    },
    showLoading : function(){
            console.log("Loading ...");
            userRegistrationElement.style.display = "none";
            loadingElement.style.display = "block";
            errorElements.style.display = "none";
    },
    showSuccessDiv : function(){
            userRegistrationElement.style.display = "none";
            loadingElement.style.display = "none";
            errorElements.style.display = "none";
            successElement.style.display = 'block';
    },
    showError : function(error){
              userRegistrationElement.style.display = "block";
              loadingElement.style.display = "none";
              errorElements.style.display = "block";
              errorElements.innerHTML = error;
    },
    setHeaderEmail : function(email){
              headerUserElem.innerText = email;
    }
};

view.init();
