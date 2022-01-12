module.exports = {
    presets: ['@babel/preset-react', '@babel/preset-env', '@babel/preset-typescript'],
    plugins: [['@babel/plugin-proposal-pipeline-operator', { proposal: 'hack', topicToken: '%' }]],
};
