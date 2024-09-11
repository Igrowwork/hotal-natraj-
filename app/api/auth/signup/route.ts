import prismadb from '@/lib/prismadb';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server'


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password, phone } = body;
        const existeduser = await prismadb.user.findFirst({ where: { email } });
        if (existeduser) {
            return new NextResponse("User Already exists", { status: 409 });
        }
        if(password.length < 6){
            return new NextResponse("Password Should be 6 characters long", { status: 409 });
        }
        const hashedPassword = await hash(password, 8);
        const newuser = await prismadb.user.create({
            data: {
                name: name,
                phone: phone,
                email: email,
                password: hashedPassword,
            }
        });

        const user = {
            email: newuser.email,
            name: newuser.name,
            id: newuser.id
        }   
        return NextResponse.json({success: true, user})
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}