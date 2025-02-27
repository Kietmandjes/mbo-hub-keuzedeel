import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState('');
    const handleSubmit = (event: React.FormEvent) => {
        setLoading(true);
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
                setLoading(false);
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
                setLoading(false);
                toast({
                    title: "Error",
                    description: "Er is een fout opgetreden bij het inloggen.",
                    variant: "destructive",
                });
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
                         {loading ?  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                            <circle fill="#FFFFFFFF" stroke="#FFFFFFFF" stroke-width="20" r="15" cx="40" cy="100">
                                <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate>
                            </circle>
                            <circle fill="#FFFFFFFF" stroke="#FFFFFFFF" stroke-width="20" r="15" cx="100" cy="100">
                                <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate>
                                </circle>
                            <circle fill="#FFFFFFFF" stroke="#FFFFFFFF" stroke-width="20" r="15" cx="160" cy="100">
                                <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate>
                            </circle>
                        </svg>: 'Login'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;