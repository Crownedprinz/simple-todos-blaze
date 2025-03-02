import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '../imports/db/TasksCollection';
import '/imports/api/tasksMethods';
import '/imports/api/tasksPublications';

const insertTask = (taskText, user) =>
  TasksCollection.insertAsync({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(async () => {
  let user = await Accounts.findUserByUsername(SEED_USERNAME);
  if (!user) {
    Accounts.createUserAsync({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  user = await Accounts.findUserByUsername(SEED_USERNAME);

  if(user){
    if (await TasksCollection.find().countAsync() === 0) {
      [
        'First Task',
        'Second Task',
        'Third Task',
        'Fourth Task',
        'Fifth Task',
        'Sixth Task',
        'Seventh Task',
      ].forEach(taskText => insertTask(taskText, user));
    }
  }
});