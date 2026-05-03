const STORIES = [
  {
    id: 'happy-cat',
    title: 'The Happy Cat',
    thumbnail: 'cat_thumb.png',
    pages: [
      { text: 'Leo is a happy cat.', image: 'cat_page1.png' },
      { text: 'Leo sees a red ball.', image: 'cat_page2.png' },
      { text: 'He bats the red ball with his paw.', image: 'cat_page3.png' },
      { text: 'Now Leo is ready for a nap.', image: 'cat_page4.png' },
      { text: 'Leo finds a blue butterfly.', image: 'cat_thumb.png' },
      { text: 'The butterfly flies away.', image: 'cat_page3.png' }
    ],
    questions: [
      { text: 'What is the name of the cat?', options: ['Tom', 'Leo', 'Sam'], correctIndex: 1 },
      { text: 'What color was the ball?', options: ['Blue', 'Green', 'Red'], correctIndex: 2 },
      { text: 'What did Leo do with the ball?', options: ['Ate it', 'Batted it', 'Hid it'], correctIndex: 1 },
      { text: 'What is Leo ready for now?', options: ['Dinner', 'A walk', 'A nap'], correctIndex: 2 },
      { text: 'What did Leo find?', options: ['A bird', 'A butterfly', 'A frog'], correctIndex: 1 },
      { text: 'What did the butterfly do?', options: ['Sang a song', 'Flew away', 'Ate a snack'], correctIndex: 1 }
    ]
  },
  {
    id: 'sunny-day',
    title: 'A Sunny Day',
    thumbnail: 'sun_thumb.png',
    pages: [
      { text: 'Today is a sunny day.', image: 'sun_thumb.png' },
      { text: 'Emma goes to the park.', image: 'sun_thumb.png' },
      { text: 'She sees a yellow duck in the pond.', image: 'sun_thumb.png' },
      { text: 'Emma waves hello to the duck.', image: 'sun_thumb.png' },
      { text: 'Emma finds a pink flower.', image: 'sun_thumb.png' },
      { text: 'She gives the flower to her mom.', image: 'sun_thumb.png' }
    ],
    questions: [
      { text: 'Where did Emma go?', options: ['School', 'Park', 'Store'], correctIndex: 1 },
      { text: 'What did Emma see?', options: ['A dog', 'A cat', 'A duck'], correctIndex: 2 },
      { text: 'What color was the duck?', options: ['Yellow', 'White', 'Brown'], correctIndex: 0 },
      { text: 'What was the weather like?', options: ['Rainy', 'Sunny', 'Snowy'], correctIndex: 1 },
      { text: 'What did Emma find?', options: ['A rock', 'A flower', 'A leaf'], correctIndex: 1 },
      { text: 'Who did she give the flower to?', options: ['Her dad', 'Her mom', 'Her friend'], correctIndex: 1 }
    ]
  },
  {
    id: 'brave-bird',
    title: 'The Brave Bird',
    thumbnail: 'bird_thumb.png',
    pages: [
      { text: 'A little bird named Pip wants to fly.', image: 'bird_thumb.png' },
      { text: 'He looks at the blue sky.', image: 'bird_thumb.png' },
      { text: 'He flaps his wings.', image: 'bird_thumb.png' },
      { text: 'He jumps from the nest.', image: 'bird_thumb.png' },
      { text: 'He is flying!', image: 'bird_thumb.png' },
      { text: 'Pip is a brave bird.', image: 'bird_thumb.png' }
    ],
    questions: [
      { text: 'What is the name of the bird?', options: ['Pip', 'Sky', 'Nest'], correctIndex: 0 },
      { text: 'What color is the sky?', options: ['Red', 'Blue', 'Green'], correctIndex: 1 },
      { text: 'What did Pip flap?', options: ['His feet', 'His tail', 'His wings'], correctIndex: 2 },
      { text: 'Where did Pip jump from?', options: ['The tree', 'The nest', 'The grass'], correctIndex: 1 },
      { text: 'What is Pip doing now?', options: ['Eating', 'Sleeping', 'Flying'], correctIndex: 2 },
      { text: 'What kind of bird is Pip?', options: ['Brave', 'Scared', 'Sleepy'], correctIndex: 0 }
    ]
  },
  {
    id: 'pizza-party',
    title: 'Pizza Party',
    thumbnail: 'pizza_thumb.png',
    pages: [
      { text: 'Sam is making a pizza.', image: 'pizza_thumb.png' },
      { text: 'He rolls the dough.', image: 'pizza_thumb.png' },
      { text: 'He adds red sauce.', image: 'pizza_thumb.png' },
      { text: 'He puts on lots of cheese.', image: 'pizza_thumb.png' },
      { text: 'The pizza goes in the oven.', image: 'pizza_thumb.png' },
      { text: 'It is time to eat!', image: 'pizza_thumb.png' }
    ],
    questions: [
      { text: 'Who is making pizza?', options: ['Sam', 'Leo', 'Emma'], correctIndex: 0 },
      { text: 'What did Sam roll?', options: ['A ball', 'The dough', 'A toy'], correctIndex: 1 },
      { text: 'What color is the sauce?', options: ['Yellow', 'Green', 'Red'], correctIndex: 2 },
      { text: 'What did he put on the sauce?', options: ['Cheese', 'Apples', 'Candy'], correctIndex: 0 },
      { text: 'Where did the pizza go?', options: ['In the fridge', 'In the oven', 'In the sink'], correctIndex: 1 },
      { text: 'What is it time to do now?', options: ['Sleep', 'Play', 'Eat'], correctIndex: 2 }
    ]
  },
  {
    id: 'blue-car',
    title: 'The Blue Car',
    thumbnail: 'car_thumb.png',
    pages: [
      { text: 'This is a blue car.', image: 'car_thumb.png' },
      { text: 'It has four round wheels.', image: 'car_thumb.png' },
      { text: 'The car goes fast.', image: 'car_thumb.png' },
      { text: 'Beep beep goes the horn.', image: 'car_thumb.png' },
      { text: 'The car stops at the light.', image: 'car_thumb.png' },
      { text: 'The car is at home now.', image: 'car_thumb.png' }
    ],
    questions: [
      { text: 'What color is the car?', options: ['Red', 'Blue', 'Yellow'], correctIndex: 1 },
      { text: 'How many wheels does it have?', options: ['Two', 'Four', 'Six'], correctIndex: 1 },
      { text: 'How does the car go?', options: ['Fast', 'Slow', 'Jump'], correctIndex: 0 },
      { text: 'What sound does the horn make?', options: ['Moo', 'Beep beep', 'Quack'], correctIndex: 1 },
      { text: 'Where did the car stop?', options: ['The park', 'The store', 'The light'], correctIndex: 2 },
      { text: 'Where is the car now?', options: ['At home', 'At school', 'At work'], correctIndex: 0 }
    ]
  },
  {
    id: 'farm-friends',
    title: 'Farm Friends',
    thumbnail: 'farm_thumb.png',
    pages: [
      { text: 'The farm is very big.', image: 'farm_thumb.png' },
      { text: 'The cow says moo.', image: 'farm_thumb.png' },
      { text: 'The pig is in the mud.', image: 'farm_thumb.png' },
      { text: 'The hen has three eggs.', image: 'farm_thumb.png' },
      { text: 'The horse runs in the grass.', image: 'farm_thumb.png' },
      { text: 'All the friends are happy.', image: 'farm_thumb.png' }
    ],
    questions: [
      { text: 'Is the farm big or small?', options: ['Small', 'Big', 'Tiny'], correctIndex: 1 },
      { text: 'What does the cow say?', options: ['Moo', 'Oink', 'Cluck'], correctIndex: 0 },
      { text: 'Where is the pig?', options: ['In the grass', 'In the mud', 'In the house'], correctIndex: 1 },
      { text: 'How many eggs does the hen have?', options: ['One', 'Two', 'Three'], correctIndex: 2 },
      { text: 'Where does the horse run?', options: ['In the mud', 'In the house', 'In the grass'], correctIndex: 2 },
      { text: 'How do the friends feel?', options: ['Sad', 'Happy', 'Angry'], correctIndex: 1 }
    ]
  },
  {
    id: 'red-apple',
    title: 'A Red Apple',
    thumbnail: 'apple_thumb.png',
    pages: [
      { text: 'I have a red apple.', image: 'apple_thumb.png' },
      { text: 'It grew on a big tree.', image: 'apple_thumb.png' },
      { text: 'I wash the apple.', image: 'apple_thumb.png' },
      { text: 'The apple is crunchy.', image: 'apple_thumb.png' },
      { text: 'It tastes very sweet.', image: 'apple_thumb.png' },
      { text: 'I love eating apples.', image: 'apple_thumb.png' }
    ],
    questions: [
      { text: 'What color is the apple?', options: ['Green', 'Red', 'Yellow'], correctIndex: 1 },
      { text: 'Where did the apple grow?', options: ['In the ground', 'On a tree', 'In a box'], correctIndex: 1 },
      { text: 'What do I do to the apple first?', options: ['Wash it', 'Eat it', 'Throw it'], correctIndex: 0 },
      { text: 'How does the apple feel?', options: ['Soft', 'Crunchy', 'Sticky'], correctIndex: 1 },
      { text: 'How does the apple taste?', options: ['Sour', 'Sweet', 'Salty'], correctIndex: 1 },
      { text: 'What do I love doing?', options: ['Eating apples', 'Climbing trees', 'Washing fruit'], correctIndex: 0 }
    ]
  }
];

export default STORIES;
