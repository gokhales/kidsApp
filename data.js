const STORIES = [
  {
    id: 'happy-cat',
    title: 'The Happy Cat',
    thumbnail: 'cat_thumb.png',
    pages: [
      {
        text: 'Leo is a happy cat.',
        image: 'cat_page1.png'
      },
      {
        text: 'Leo sees a red ball.',
        image: 'cat_page2.png'
      },
      {
        text: 'He bats the red ball with his paw.',
        image: 'cat_page3.png'
      },
      {
        text: 'Now Leo is ready for a nap.',
        image: 'cat_page4.png'
      }
    ],
    questions: [
      {
        text: 'What is the name of the cat?',
        options: ['Tom', 'Leo', 'Sam'],
        correctIndex: 1
      },
      {
        text: 'What color was the ball?',
        options: ['Blue', 'Green', 'Red'],
        correctIndex: 2
      }
    ]
  },
  {
    id: 'sunny-day',
    title: 'A Sunny Day',
    thumbnail: 'sun_thumb.png',
    pages: [
      {
        text: 'Today is a sunny day.',
        image: 'sun_thumb.png'
      },
      {
        text: 'Emma goes to the park.',
        image: 'sun_thumb.png'
      },
      {
        text: 'She sees a yellow duck in the pond.',
        image: 'sun_thumb.png'
      },
      {
        text: 'Emma waves hello to the duck.',
        image: 'sun_thumb.png'
      }
    ],
    questions: [
      {
        text: 'Where did Emma go?',
        options: ['School', 'Park', 'Store'],
        correctIndex: 1
      },
      {
        text: 'What did Emma see?',
        options: ['A dog', 'A cat', 'A duck'],
        correctIndex: 2
      }
    ]
  }
];

export default STORIES;
