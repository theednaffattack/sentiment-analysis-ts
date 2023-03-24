import BayesClassifier from "./classifier/bayes-classifier";

const _BayesClassifier = require("./classifier/bayes_classifier");
export const LogisticRegressionClassifier = require("./classifier/logistic_regression_classifier");
export const KMeans = require("./clusterer/kmeans");

export { _BayesClassifier as BayesClassifier };

// export BayesClassifier from "./classifier/bayes-classifier"
