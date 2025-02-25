import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { toast } = useToast();

    const [error, setError] = useState('');
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle login logic here
        fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then(response => response.json())
            .then(data => {
                // Handle response data here
                if(data.status !=='success'){
                    setError(data.status);
                    toast({
                        title: "Error",
                        description: data.message,
                        variant: "destructive",
                    });
                    return
                }
                if(error){
                    setError('');
                }
                toast({
                    title: "Succes",
                    description: "Je bent ingelogd!",
                    variant: "destructive",
                  });

            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className='container mx-auto px-4 py-24'>
            <div className="text-center ">
                <h1 className="text-4xl font-bold text-primary mb-4">Inloggen</h1>
            </div>
            <div className='w-full flex justify-center items-center px-4 py-24'>
                <form className='flex flex-col w-1/4 gap-2' onSubmit={handleSubmit}>
                {error !== '' && (
                    <p className="text-red-500">Invalid {error} </p>
                )}
                    <label>
                        Email:
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Password:
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <Button type="submit" className="w-full mt-2 text-white">
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;