Tasks = new Mongo.Collection('tasks')

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function(){
      return Tasks.find({}, {sort : {createdAt: -1}});
    }
  });

  Template.body.events({
    'submit .new-task': function(event){
      //prevent default browser form submit
      event.preventDefault();

      console.log(event);
      console.log(event.target.task.value);

      //Get value form element
      var text = event.target.task.value;

      //object being saved
      if(text){
      var item = {text:text, createdAt: new Date()};
      }

      //insert/saving a task into a collection
      Tasks.insert(item);

      event.target.task.value = '';

    }
  });

  Template.body.events({
    'click .toggle-checked': function(){
      //set the checked property of the opposite of its current value
      Tasks.update(this._id, {
        $set: {checked: ! this.checked}
      });
    },
    'click .delete': function(){
      Tasks.remove(this._id);
    }
  });

};

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
