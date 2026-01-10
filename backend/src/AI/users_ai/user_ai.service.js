// Backend logic to support AI responses for frontend
class UserAIService {
    constructor() {
        this.onboardingSteps = [
            "Upload profile picture",
            "Add connections",
            "Understand feed",
            "Start live sessions",
            "Check store",
            "Learn rules"
        ];
    }

    getNextStep(user) {
        // Returns next step based on user progress
        for (let step of this.onboardingSteps) {
            if(!user.completedSteps.includes(step)){
                return step;
            }
        }
        return "You're all set! Enjoy the platform.";
    }
}

module.exports = new UserAIService();