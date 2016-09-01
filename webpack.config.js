module.exports = {
    entry:'./app/app.js',
    output:{
        path:__dirname ,
        filename:'build.js'
    },
    devtool:'source-map',
    module:{
        loaders:[
            {test:/\.js$/,exclude:/node_modules/,loader:'react-hot!babel'},
            {test:/\.css$/,loader:'style!css'},
            {test:/\.html$/,exclude:/node_modules/,loader:'html!'}
        ]
    }
};
