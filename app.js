import STORIES from './data.js';

class StoryApp {
    constructor() {
        this.currentStory = null;
        this.currentPageIndex = 0;
        this.currentQuizIndex = 0;
        this.isSpeaking = false;

        // View Elements
        this.views = {
            library: document.getElementById('library-view'),
            story: document.getElementById('story-view'),
            quiz: document.getElementById('quiz-view')
        };

        // DOM Elements
        this.grid = document.getElementById('story-grid');
        this.pageImage = document.getElementById('page-image');
        this.pageText = document.getElementById('page-text');
        this.nextPageBtn = document.getElementById('next-page-btn');
        this.backBtn = document.getElementById('back-to-library-btn');
        this.quizQuestion = document.getElementById('quiz-question');
        this.optionsContainer = document.getElementById('options-container');
        this.feedbackContainer = document.getElementById('quiz-feedback');
        this.feedbackMessage = document.getElementById('feedback-message');
        this.quizNextBtn = document.getElementById('quiz-next-btn');

        this.preferredVoice = null;
        
        // Handle voices being loaded asynchronously
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
        }
        this.loadVoices();

        this.init();
    }

    init() {
        this.renderLibrary();
        this.attachEventListeners();
    }

    loadVoices() {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length === 0) return;

        // Try to find a friendly female voice
        // Common high-quality names on iPad/Mac/Windows
        this.preferredVoice = voices.find(v => 
            v.name.includes('Siri') || 
            v.name.includes('Samantha') || 
            v.name.includes('Victoria') || 
            v.name.includes('Google UK English Female') ||
            v.name.includes('Google US English') || // Often female by default
            v.name.toLowerCase().includes('female')
        ) || voices[0];
    }

    attachEventListeners() {
        this.nextPageBtn.addEventListener('click', () => this.nextPage());
        this.backBtn.addEventListener('click', () => this.showView('library'));
        this.quizNextBtn.addEventListener('click', () => this.nextQuizItem());
    }

    renderLibrary() {
        this.grid.innerHTML = '';
        STORIES.forEach(story => {
            const card = document.createElement('div');
            card.className = 'story-card';
            card.innerHTML = `
                <img src="${story.thumbnail}" alt="${story.title}">
                <h3>${story.title}</h3>
            `;
            card.addEventListener('click', () => this.startStory(story));
            this.grid.appendChild(card);
        });
    }

    showView(viewName) {
        Object.keys(this.views).forEach(key => {
            this.views[key].classList.toggle('active', key === viewName);
        });
        
        // Stop any ongoing speech when switching views
        window.speechSynthesis.cancel();
    }

    startStory(story) {
        this.currentStory = story;
        this.currentPageIndex = 0;
        this.showView('story');
        this.renderPage();
    }

    renderPage() {
        const page = this.currentStory.pages[this.currentPageIndex];
        this.pageImage.src = page.image;
        this.pageText.textContent = page.text;
        this.nextPageBtn.classList.add('hidden');
        
        this.speak(page.text, () => {
            this.nextPageBtn.classList.remove('hidden');
        });
    }

    nextPage() {
        this.currentPageIndex++;
        if (this.currentPageIndex < this.currentStory.pages.length) {
            this.renderPage();
        } else {
            this.startQuiz();
        }
    }

    startQuiz() {
        this.currentQuizIndex = 0;
        this.showView('quiz');
        this.renderQuizItem();
    }

    renderQuizItem() {
        const quiz = this.currentStory.questions[this.currentQuizIndex];
        this.quizQuestion.textContent = quiz.text;
        this.optionsContainer.innerHTML = '';
        this.feedbackContainer.classList.add('hidden');

        quiz.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option;
            btn.addEventListener('click', () => this.handleAnswer(index));
            this.optionsContainer.appendChild(btn);
        });

        this.speak(quiz.text);
    }

    async handleAnswer(selectedIndex) {
        const quiz = this.currentStory.questions[this.currentQuizIndex];
        const buttons = this.optionsContainer.querySelectorAll('.option-btn');
        
        // Disable all buttons
        buttons.forEach(btn => btn.disabled = true);

        if (selectedIndex === quiz.correctIndex) {
            buttons[selectedIndex].classList.add('correct');
            this.feedbackMessage.textContent = 'Great job!';
            this.feedbackMessage.style.color = 'var(--correct-color)';
            await this.speak('Great job!');
        } else {
            buttons[selectedIndex].classList.add('incorrect');
            buttons[quiz.correctIndex].classList.add('correct');
            
            this.feedbackMessage.textContent = 'Good try! Let\'s look at the right one.';
            this.feedbackMessage.style.color = '#721C24';
            
            // Speak encouraging message
            await this.speak('Good try! Let\'s look at the right one.');
            // Speak the correct answer
            await this.speak('The correct answer is: ' + quiz.options[quiz.correctIndex]);
        }

        this.feedbackContainer.classList.remove('hidden');
    }

    nextQuizItem() {
        this.currentQuizIndex++;
        if (this.currentQuizIndex < this.currentStory.questions.length) {
            this.renderQuizItem();
        } else {
            this.finishStory();
        }
    }

    finishStory() {
        this.speak('You finished the story! Well done.', () => {
            this.showView('library');
        });
    }

    speak(text, callback) {
        return new Promise(resolve => {
            // Cancel any current speech
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            
            if (this.preferredVoice) {
                utterance.voice = this.preferredVoice;
            }

            // Exciting tone settings
            utterance.rate = 1.05; // Slightly faster for energy
            utterance.pitch = 1.3; // Higher pitch for a "happy/exciting" child-friendly sound

            utterance.onend = () => {
                if (callback) callback();
                resolve();
            };

            window.speechSynthesis.speak(utterance);
        });
    }
}

// Initialize the app
window.addEventListener('DOMContentLoaded', () => {
    new StoryApp();
});
