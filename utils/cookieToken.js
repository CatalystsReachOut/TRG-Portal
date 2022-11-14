
export const cookieToken=(user,res,message)=>{
    const token=user.getJwtToken();

    const options={
        expires:new Date(
            Date.now()+process.env.COOKIE_TIME*24*60*60*1000
        ),
        httpOnly:true
    }
    user.password=undefined
    res.status(200).cookie('token',token,options).json({
        success:true,
        message:message,
        token,
        _id:user._id,
        firstname:user.firstname,
        lastname:user.lastname,
        email:user.email,
        role:user.role,
        level_:user.level_
    })
}

export const cookieTokenJobseeker=(jobseeker,res,message)=>{
    const token=jobseeker.getJwtToken();

    const options={
        expires:new Date(
            Date.now()+process.env.COOKIE_TIME*24*60*60*1000
        ),
        httpOnly:true
    }
    jobseeker.password=undefined
    console.log(token);
    res.status(200).cookie('token',token,options).json({
        success:true,
        message:message,
        token,
        _id:jobseeker._id,
        name:jobseeker.name,
        email:jobseeker.email,
    })
}