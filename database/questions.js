/*
Which of the following best describes your personality?
a. Outgoing and social
b. Introverted and independent
c. Thoughtful and reflective
d. Spontaneous and adventurous



How do you like to spend your weekends?
a. Exploring new places and trying new things
b. Relaxing at home and catching up on reading or TV shows
c. Hanging out with friends and attending parties or events
d. Pursuing your hobbies or interests, such as playing sports or creating art

What is your favorite type of food?
a. Fast food and junk food
b. Healthy and organic
c. International cuisine, such as sushi or Indian food
d. Comfort food, such as pizza or mac and cheese

What is your favorite type of movie or TV show?
a. Action and adventure
b. Drama and romance
c. Comedy and humor
d. Thriller and suspense

What are your thoughts on politics and social issues?
a. Very interested and engaged
b. Somewhat interested, but not very politically active
c. Neutral or apathetic towards politics and social issues
d.. Disinterested or actively opposed to political and social activism

Which of the following best describes your preferred work environment?
a. Collaborative and team-oriented
b. Independent and self-directed
c. Structured and organized
d. Flexible and adaptable
What is your favorite way to exercise or stay active?
a. Running or jogging
b. Yoga or Pilates
c. Weightlifting or strength training
d. NOTA

Which of the following best describes your preferred communication style?
a. Direct and straightforward
b. Diplomatic and tactful
c. Indirect or passive-aggressive
d. Varied, depending on the situation

What kind of books do you enjoy reading the most?
a. Fiction / fantasy novels or short stories
b. Non-fiction, such as biographies or history books
c. Self-help or personal development books
d.NOTA



Which of the following best describes your sense of style?
a. Trendy and fashionable
b. Casual and comfortable
c. Alternative or grunge
d. Classic or timeless

What is your favorite type of social media platform?
a. Instagram
b. YouTube
c. Twitter
d. Facebook


What is your favorite type of music?
a. Pop or mainstream
b. Rock or alternative
c. Hip hop or rap
d. EDM or electronic music

Which of the following best describes your attitude towards school and education?
a. Academically driven and ambitious
b. Relaxed and easygoing
c. Creative and artistic
d. Disinterested or bored

What is your favorite anime or manga series?
a. Naruto
b. NOTA
c. One Piece
d. Death Note

What is your favorite K-pop group or artist?
a. BTS
b. Blackpink
c. EXO
d. NOTA

Which of the following best describes your social life and relationships?
a. Very social and extroverted
b. Selective and close-knit
c. Introverted or shy
d. Varied, depending on the situation



What is your favorite type of video game?
a. First-person shooters or action games
b. Role-playing games or MMOs
c. Sports or racing games
d. NOTA

Which of the following best describes your preferred form of entertainment?
a. Movies or TV shows
b. Music or concerts
c. Reading or writing
d. Gaming or streaming

*/

const questions = [
  {
    question: "Which of the following best describes your personality?",
    options: [
      "Outgoing and social",
      "Introverted and independent",
      "Thoughtful and reflective",
      "Spontaneous and adventurous",
    ],
  },
  {
    question: "How do you like to spend your weekends?",
    options: [
      "Exploring new places and trying new things",
      "Relaxing at home and catching up on reading or TV shows",
      "Hanging out with friends and attending parties or events",
      "Pursuing your hobbies or interests, such as playing sports or creating art",
    ],
  },
  {
    question: "What is your favorite type of food?",
    options: [
      "Fast food and junk food",
      "Healthy and organic",
      "International cuisine, such as sushi or Indian food",
      "Comfort food, such as pizza or mac and cheese",
    ],
  },
  {
    question: "What is your favorite type of movie or TV show?",
    options: [
      "Action and adventure",
      "Drama and romance",
      "Comedy and humor",
      "Thriller and suspense",
    ],
  },
  {
    question: "What are your thoughts on politics and social issues?",
    options: [
      "Very interested and engaged",
      "Somewhat interested, but not very politically active",
      "Neutral or apathetic towards politics and social issues",
      "Disinterested or actively opposed to political and social activism",
    ],
  },
  {
    question:
      "Which of the following best describes your preferred work environment?",
    options: [
      "Collaborative and team-oriented",
      "Independent and self-directed",
      "Structured and organized",
      "Flexible and adaptable",
    ],
  },
  {
    question: "What is your favorite way to exercise or stay active?",
    options: [
      "Running or jogging",
      "Yoga or Pilates",
      "Weightlifting or strength training",
      "NOTA",
    ],
  },
  {
    question:
      "Which of the following best describes your preferred communication style?",
    options: [
      "Direct and straightforward",
      "Diplomatic and tactful",
      "Indirect or passive-aggressive",
      "Varied, depending on the situation",
    ],
  },
  {
    question: "What kind of books do you enjoy reading the most?",
    options: [
      "Fiction / fantasy novels or short stories",
      "Non-fiction, such as biographies or history books",
      "Self-help or personal development books",
      "NOTA",
    ],
  },
  {
    question: "Which of the following best describes your sense of style?",
    options: [
      "Trendy and fashionable",
      "Casual and comfortable",
      "Alternative or grunge",
      "Classic or timeless",
    ],
  },
  {
    question: "What is your favorite type of social media platform?",
    options: ["Instagram", "YouTube", "Twitter", "Facebook"],
  },
  {
    question: "What is your favorite type of music?",
    options: [
      "Pop or mainstream",
      "Rock or alternative",
      "Hip hop or rap",
      "EDM or electronic music",
    ],
  },
  {
    question:
      "Which of the following best describes your attitude towards school and education?",
    options: [
      "Academically driven and ambitious",
      "Relaxed and easygoing",
      "Creative and artistic",
      "Disinterested or bored",
    ],
  },
  {
    question: "What is your favorite anime or manga series?",
    options: ["Naruto", "NOTA", "One Piece", "Death Note"],
  },
  {
    question: "What is your favorite K-pop group or artist?",
    options: ["BTS", "Blackpink", "EXO", "NOTA"],
  },
  {
    question:
      "Which of the following best describes your social life and relationships?",
    options: [
      "Very social and extroverted",
      "Selective and close-knit",
      "Introverted or shy",
      "Varied, depending on the situation",
    ],
  },
  {
    question: "What is your favorite type of video game?",
    options: [
      "First-person shooters or action games",
      "Role-playing games or MMOs",
      "Sports or racing games",
      "NOTA",
    ],
  },
  {
    question:
      "Which of the following best describes your preferred form of entertainment?",
    options: [
      "Movies or TV shows",
      "Music or concerts",
      "Reading or writing",
      "Gaming or streaming",
    ],
  },
];
