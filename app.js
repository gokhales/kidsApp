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

        // Try to find a high-quality "sweet" female voice
        // We prioritize names that are known to be high-quality on iOS/macOS/Windows
        const preferredNames = ['Siri', 'Samantha', 'Victoria', 'Karen', 'Moira'];
        
        // First, check for "enhanced" or "premium" versions which sound much sweeter
        let foundVoice = voices.find(v => (v.name.includes('Enhanced') || v.name.includes('Premium')) && 
            preferredNames.some(name => v.name.includes(name)));

        // Fallback to standard high-quality female voices
        if (!foundVoice) {
            foundVoice = voices.find(v => preferredNames.some(name => v.name.includes(name)));
        }

        // Fallback to any female voice
        if (!foundVoice) {
            foundVoice = voices.find(v => v.name.toLowerCase().includes('female'));
        }

        this.preferredVoice = foundVoice || voices[0];
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
        
        // Wrap words in spans for highlighting
        this.pageText.innerHTML = page.text.split(' ').map(word => `<span class="word">${word}</span>`).join(' ');
        
        this.nextPageBtn.classList.add('hidden');
        
        this.speak(page.text, () => {
            this.nextPageBtn.classList.remove('hidden');
        }, this.pageText);
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

    speak(text, callback, element) {
        return new Promise(resolve => {
            // Cancel any current speech
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            
            if (this.preferredVoice) {
                utterance.voice = this.preferredVoice;
            }

            // Gentle and "Sweet" tone settings
            utterance.rate = 0.85; // Keep it soothing and slow
            utterance.pitch = 1.2; // Increase pitch slightly for a "sweeter" sound

            if (element) {
                const spans = element.querySelectorAll('.word');
                utterance.onboundary = (event) => {
                    if (event.name === 'word') {
                        // Find which word index we are at
                        const charIndex = event.charIndex;
                        const textUntilBoundary = text.substring(0, charIndex);
                        const wordIndex = textUntilBoundary.split(' ').length - 1;

                        // Highlight the corresponding span
                        spans.forEach((span, i) => {
                            span.classList.toggle('highlight', i === wordIndex);
                        });
                    }
                };
            }

            utterance.onend = () => {
                if (element) {
                    const spans = element.querySelectorAll('.word');
                    spans.forEach(span => span.classList.remove('highlight'));
                }
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
