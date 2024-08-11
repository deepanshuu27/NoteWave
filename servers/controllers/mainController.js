exports.homepage = async (req,res) =>{
    
    res.render('index',
        {layout:'../views/layouts/front-page'}
    );

}
                   

exports.about = async (req,res) =>{
    
    res.render('about',
        {layout:'../views/layouts/aboutPage'}
    );
}


exports.features = async (req,res) =>{
    
    res.render('features',
        {layout:'../views/layouts/aboutPage'}
    );
}

exports.frequently = async (req,res) =>{
    
    res.render('faq',
        {layout:'../views/layouts/aboutPage'}
    );
}

