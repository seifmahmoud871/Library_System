const dataMethod=["body","query","params","headers"];

const validation = (schema)=>{

    
    return(req,res,next)=>{

        const validationArr=[];

        dataMethod.forEach(key=>{
            if(schema[key]){
                const validation =schema[key].validate(req[key],{abortEarly:false});
                if(validation.error){
                    validationArr.push(validation.error.details);
                }
                
            }
        });

        if(validationArr.length>0){
            return res.json({message:"validation Error",validationArr})
        }
        else
            return next();
        
    } 
}

export default validation;