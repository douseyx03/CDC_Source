import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Navbar from '@/components/Navbar';
import { Eye, EyeOff, Shield, Smartphone } from 'lucide-react';
import { useAuthStore } from '@/stores/auth';

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    otp: ''
  });
  const [showOTP, setShowOTP] = useState(false);

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!showOTP) {
      setShowOTP(true);
    } else {
      login({ email: loginData.email });
      setShowOTP(false);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">CDC</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Connexion sécurisée</h2>
            <p className="mt-2 text-gray-600">Accédez à votre espace CDC Sénégal</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span>Authentification</span>
              </CardTitle>
              <CardDescription>
                Utilisez vos identifiants pour vous connecter
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="phone">Téléphone</TabsTrigger>
                </TabsList>
                
                <TabsContent value="email">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Adresse email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={loginData.email}
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Mot de passe</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Votre mot de passe"
                          value={loginData.password}
                          onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    {showOTP && (
                      <div className="space-y-2">
                        <Label htmlFor="otp" className="flex items-center space-x-2">
                          <Smartphone className="h-4 w-4" />
                          <span>Code OTP</span>
                        </Label>
                        <Input
                          id="otp"
                          type="text"
                          placeholder="123456"
                          maxLength={6}
                          value={loginData.otp}
                          onChange={(e) => setLoginData({...loginData, otp: e.target.value})}
                          required
                        />
                        <Alert>
                          <AlertDescription>
                            Un code de vérification a été envoyé sur votre téléphone.
                          </AlertDescription>
                        </Alert>
                      </div>
                    )}

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      {showOTP ? 'Vérifier et se connecter' : 'Se connecter'}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="phone">
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      login({});
                      navigate('/dashboard');
                    }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="phone">Numéro de téléphone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+221 XX XXX XX XX"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone-password">Mot de passe</Label>
                      <div className="relative">
                        <Input
                          id="phone-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Votre mot de passe"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      Se connecter
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 space-y-4">
                <div className="text-center">
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Mot de passe oublié ?
                  </Link>
                </div>
                
                <div className="text-center text-sm text-gray-600">
                  Pas encore de compte ?{' '}
                  <Link to="/register" className="text-blue-600 hover:underline font-medium">
                    S'inscrire
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-xs text-gray-500">
            <p>Connexion sécurisée avec chiffrement AES 256</p>
            <p>Conforme à la réglementation sénégalaise sur la protection des données</p>
          </div>
        </div>
      </div>
    </div>
  );
}
