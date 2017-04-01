var model = {
      addPassage : function(passagecode,passagetext)
               {
                       var postKey = firebase.database().ref().child('Passages').push().key;
                       var updates = {};
                       var postData =
                        {
                              Accuracy:"97" ,
                              Code:passagecode,
                              Depressions:"2000" ,
                              PassageString:passagetext ,
                              Time:"900"
                        };
                        updates['/Passages/'+ postKey] = postData;
                        firebase.database().ref().update(updates).then(function()
                        {
                              presenter .addPassageSucess();
                        })
                        .catch(function(error)
                        {
                              return presenter .addPassageError(error);
                        });
              }
};

var presenter = {

    addPassage : function(passagecode,passagetext){
                          if(passagecode=="")
                          {
                              view.showError("Enter Passage Code");
                              return;
                          }
                          else if(passagetext=="")
                          {
                              view.showError("Enter Passage");
                              return;
                          }
                          else
                          {
                              view.showLoading();
                              model.addPassage(passagecode,passagetext);
                          }
                  },
    addPassageError    : function(error){
                          view.showError(error);
                  },
    addPassageSucess  : function(email){
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

             addPassageElements = document.getElementById('addPassageDiv');
             errorElements = document.getElementById('addPassageError');
             passagecodeBox = document.getElementById('passagecode');
             passagetextBox = document.getElementById('passagetext');

             loadingElement = document.getElementById('loading');

             successElement = document.getElementById('successDiv');

             addPassageForm = document.getElementById('addPassageForm');

             addPassageForm.onsubmit = function(e){
                        e.preventDefault();
                        console.log(passagecodeBox.value);
                        presenter.addPassage(passagecodeBox.value,passagetextBox.value);
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
            addPassageElements.style.display = "none";
            loadingElement.style.display = "block";
            errorElements.style.display = "none";
    },
    showSuccessDiv : function(){
            addPassageElements.style.display = "none";
            loadingElement.style.display = "none";
            errorElements.style.display = "none";
            successElement.style.display = 'block';
    },
    showError : function(error){
              addPassageElements.style.display = "block";
              loadingElement.style.display = "none";
              errorElements.style.display = "block";
              errorElements.innerHTML = error;
    },
    setHeaderEmail : function(email){
              headerUserElem.innerText = email;
    }
};

view.init();
