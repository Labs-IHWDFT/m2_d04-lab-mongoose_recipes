const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');

// Import of the data from './data.json'
const data = require('./data');

// newRecipe to create in line 
let newRecipe = {
	title: 'miXto quente',
	level: 'Easy Peasy',
	ingredients: ['pão francês', 'queijo', 'presunto'],
	cuisine: 'Brasileira',
	dishType: 'Snack',
	image:
		'http://culinaria.culturamix.com/blog/wp-content/gallery/misto-quente-3/Misto-Quente-6.jpg',
	duration: 5,
	creator: 'JOC'
};

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';


// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
  })
  .then(() => {
	  return Recipe.deleteMany()
    })
	
// iteration 2
  .then(async () => {
	  const result = await Recipe.create(newRecipe);
	  return console.log(`recipe added: ${result.title}`);
    })

// iteration 3
	.then(async () => {
	  const result = await Recipe.insertMany(data);
	  result.forEach((item) => {
		  console.log(`recipe for ${item.title} inserted successfully`);
	  });
    })
  
// iteration 4
  .then (async () => {
	  await Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
	  return console.log(`The recipe is updated`);
    })
  
// iteration 5
  .then(async () => {
	  await Recipe.deleteOne({ title: 'Carrot Cake' });
	  return console.log(`The recipe is deleted`);
    })

// iteration 6

  .then(() => {
	  console.log(`Disconnecting from the database... `);
	  mongoose.connection.close((error) => {
		  if (error) {
			  console.log("failed to disconnect ", error);
			}
		});
    })
	