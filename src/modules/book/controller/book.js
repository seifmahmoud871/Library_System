import bookModel from "../../../../DB/model/book.model.js";



export const addBook = async(req,res,next)=>{
    
    const {bookName,bookType,author}=req.body;

    const match=await bookModel.findOne({bookName});

    if(match){
        return res.json({message:"Book Existed"});
    }
    
    const book =await bookModel.create({bookName,bookType,author});

    return res.json({message:"Done",book});
    
}

export const getAllBooks = async(req,res,next)=>{

    const books=await bookModel.find().select("bookName bookType author issued");
    return books.length>0 ? res.json({message:"Done",books}):res.json({message:"Store is empty"});

}

export const issueBook= async (req,res,next)=>{

    const {bookName,returnDate}=req.body;
    console.log({bookName});
    const book = await bookModel.findOne({bookName});
    console.log({book});
    if(!book||book.issued){
        return res.json({message:"Sorry Book Not Found"});
    }

    const id = req.user._id.toString();
    console.log({id});

    book.issued=true,
    book.issueruser=id;
    book.issuedDate = new Date();
    book.returnDate = new Date(returnDate);
    await book.save();

    return res.json({message:"Done",book});

}


// get My issued Books -----------------------------------------------

export const getMyBooks =async(req,res,next)=>{

    const id = req.user._id;

    const books = await bookModel.find({issueruser:id},"bookName issuedDate returnDate");
    console.log({books});
    return books.length>0 ? res.json({message:"Done",books}):res.json({message:"No books found"});

}

// search in issued list -----------------------------------------------

export const searchForIssuedBook =async(req,res,next)=>{

    const id = req.user._id;
    const {bookName}=req.body;

    const books = await bookModel.find({issueruser:id,bookName:{ $regex: `${bookName}`}},"bookName issuedDate returnDate");
    console.log({books});
    return books.length>0 ? res.json({message:"Done",books}):res.json({message:"No books found"});

}

// return Book -----------------------------------------------

export const returnBook =  async(req,res,next)=>{
    
    const {bookName}=req.body;
    const id = req.user._id;
    const now =new Date();
    const book = await bookModel.findOne({issueruser:id,bookName});
    if(!book){
        return res.json({message:"Book not issued"})
    }

    book.issued=false,
    book.issueruser=null;
    const diffTime = now - book.returnDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    book.issuedDate = null;
    book.returnDate = null;
    await book.save();

    if(diffDays>0){
        return res.json({message:`you have to pay ${diffDays*50} fines`});
    }
    return res.json({message:`Done`});

    
}



export const notReturnedBooks =async (req,res,next)=>{
    const now =new Date();
    const books = await bookModel.find({issued:true},"bookName issuedDate returnDate");
    books.forEach(book=>{
        const diffTime = now - book.returnDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if(diffDays>0){
            book.late=diffDays;
            // Object.assign(book, {late: diffDays});
            book.fine=diffDays*50;
            // Object.assign(book, {fine: diffDays*50});
        }
        else{
            book.late=0;
            book.fine=0;
            // Object.assign(book, {late: 0});
            // Object.assign(book, {fine: 0});
        }

    });

    return books.length>0 ? res.json({message:"Done",books}):res.json({message:"No books found"});
}


export const searchFornotReturnedBooks =async(req,res,next)=>{

    const {bookName}=req.body;  
    const now =new Date();
    const books = await bookModel.find({issued:true,bookName:{ $regex: `${bookName}`}},"bookName issuedDate returnDate");
    books.forEach(book=>{
        const diffTime = now - book.returnDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if(diffDays>0){
            book.late=diffDays;
            book.fees=diffDays*50;
        }
        else{
            book.late=0;
            book.fees=0;
            // console.log(book.fees);
        };

    });
    

    console.log({books});

    return books.length>0 ? res.json({message:"Done",books}):res.json({message:"No books found"});

}
