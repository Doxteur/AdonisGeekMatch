// importez les dépendances nécessaires ici, si besoin

export default class Controller {
    // Méthodes de base que vous souhaitez utiliser dans d'autres contrôleurs
    // Vous pouvez également y inclure des méthodes d'assistance communes

    // Par exemple, une méthode pour envoyer des réponses standardisées pourrait être incluse ici
    protected sendResponse({ response }, status, data, message = '') {
        return response.status(status).json({
            message,
            data
        });
    }
}
