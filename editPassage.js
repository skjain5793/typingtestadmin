var model = {
      editPassage : function(passagetext)
               {
                         var ref = firebase.database().ref('/Passages/' + sessionStorage.currentPassageId);

                          ref.update(
                            {
                            PassageString: passagetext
                            },
                          function(error)
                          {
                                    if (error) {
                                    presenter.errorOccured(error);
                                    }
                                    else {
                                    presenter.passageEditedSuccessfully();
                                    }
                          });
              }
};

var presenter = {

    editPassage : function(passagetext){
                          if(passagetext=="")
                          {
                              view.showError("Enter Passage");
                              return;
                          }
                          else
                          {
                              view.showLoading();
                              model.editPassage(passagetext);
                          }
                  },
    errorOccured    : function(error){
                          view.showError(error);
                  },
    passageEditedSuccessfully  : function(email){
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

             editPassageElements = document.getElementById('editPassageDiv');
             errorElements = document.getElementById('editPassageError');

             passagetextBox = document.getElementById('passagetext');

             console.log(sessionStorage.currentPassage);

             console.log(sessionStorage.currentPassageId);

             passagetextBox.value = '';
             passagetextBox.value = sessionStorage.currentPassage;

             loadingElement = document.getElementById('loading');

             successElement = document.getElementById('successDiv');

             editPassageForm = document.getElementById('editPassageForm');

             editPassageForm.onsubmit = function(e){
                        e.preventDefault();
                        presenter.editPassage(passagetextBox.value);
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
            editPassageElements.style.display = "none";
            loadingElement.style.display = "block";
            errorElements.style.display = "none";
    },
    showSuccessDiv : function(){
            editPassageElements.style.display = "none";
            loadingElement.style.display = "none";
            errorElements.style.display = "none";
            successElement.style.display = 'block';
    },
    showError : function(error){
              editPassageElements.style.display = "block";
              loadingElement.style.display = "none";
              errorElements.style.display = "block";
              errorElements.innerHTML = error;
    },
    setHeaderEmail : function(email){
              headerUserElem.innerText = email;
    }
};

view.init();
