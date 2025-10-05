import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Navbar from '@/components/Navbar';
import { Eye, EyeOff, Shield, Smartphone } from 'lucide-react';
import { useAuthStore, LoginPayload } from '@/stores/auth';

const DEVICE_NAME = 'cdc-web-client';

export default function Login() {
  const navigate = useNavigate();
  const { login, verifyPhone, loading, error, clearError, isAuthenticated } = useAuthStore((state) => ({
    login: state.login,
    verifyPhone: state.verifyPhone,
    loading: state.loading,
    error: state.error,
    clearError: state.clearError,
    isAuthenticated: state.isAuthenticated,
  }));

  const [activeTab, setActiveTab] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [emailCredentials, setEmailCredentials] = useState({ email: '', password: '' });
  const [phoneCredentials, setPhoneCredentials] = useState({ telephone: '', password: '' });
  const [pendingCredentials, setPendingCredentials] = useState<LoginPayload | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      setStatusMessage(error);
    }
  }, [error]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearError();
    setStatusMessage(null);

    const payload: LoginPayload = activeTab === 'email'
      ? { email: emailCredentials.email.trim(), password: emailCredentials.password, device_name: DEVICE_NAME }
      : { telephone: phoneCredentials.telephone.trim(), password: phoneCredentials.password, device_name: DEVICE_NAME };

    try {
      const response = await login(payload);

      if (response.requires_phone_verification) {
        setPendingCredentials(payload);
        setOtpStep(true);
        setOtpCode('');
        setStatusMessage(response.message ?? 'Un code de vérification a été envoyé sur votre téléphone.');
      } else {
        setStatusMessage('Connexion réussie.');
        navigate('/dashboard');
      }
    } catch (loginError) {
      setStatusMessage((loginError as Error).message);
    }
  };

  const handleVerifyOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!pendingCredentials) {
      return;
    }

    clearError();
    setStatusMessage(null);

    const payload = {
      code: otpCode,
      device_name: DEVICE_NAME,
      email: 'email' in pendingCredentials ? pendingCredentials.email : undefined,
      telephone: 'telephone' in pendingCredentials ? pendingCredentials.telephone : undefined,
    };

    try {
      const response = await verifyPhone(payload);

      if (response.token) {
        setStatusMessage('Téléphone vérifié. Connexion en cours...');
        navigate('/dashboard');
      }
    } catch (verifyError) {
      setStatusMessage((verifyError as Error).message);
    }
  };

  const handleResendOtp = async () => {
    if (!pendingCredentials) {
      return;
    }

    try {
      await login({ ...pendingCredentials, device_name: DEVICE_NAME });
      setStatusMessage('Un nouveau code a été envoyé.');
    } catch (resendError) {
      setStatusMessage((resendError as Error).message);
    }
  };

  const resetOtpFlow = (nextTab: 'email' | 'phone') => {
    setActiveTab(nextTab);
    setOtpStep(false);
    setOtpCode('');
    setPendingCredentials(null);
    setStatusMessage(null);
    clearError();
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
              {statusMessage && (
                <Alert className="mb-4">
                  <AlertDescription>{statusMessage}</AlertDescription>
                </Alert>
              )}

              <Tabs value={activeTab} className="w-full" onValueChange={(value) => resetOtpFlow(value as 'email' | 'phone')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="phone">Téléphone</TabsTrigger>
                </TabsList>

                <TabsContent value="email">
                  {otpStep ? (
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="otp-email" className="flex items-center space-x-2">
                          <Smartphone className="h-4 w-4" />
                          <span>Code OTP</span>
                        </Label>
                        <Input
                          id="otp-email"
                          type="text"
                          inputMode="numeric"
                          placeholder="123456"
                          maxLength={6}
                          value={otpCode}
                          onChange={(event) => setOtpCode(event.target.value)}
                          required
                        />
                      </div>

                      <div className="flex items-center justify-between space-x-4">
                        <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700" disabled={loading}>
                          Vérifier et se connecter
                        </Button>
                        <Button type="button" variant="ghost" onClick={handleResendOtp} disabled={loading}>
                          Renvoyer
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Adresse email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="votre@email.com"
                          value={emailCredentials.email}
                          onChange={(event) => setEmailCredentials({ ...emailCredentials, email: event.target.value })}
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
                            value={emailCredentials.password}
                            onChange={(event) => setEmailCredentials({ ...emailCredentials, password: event.target.value })}
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword((previous) => !previous)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                        Se connecter
                      </Button>
                    </form>
                  )}
                </TabsContent>

                <TabsContent value="phone">
                  {otpStep ? (
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="otp-phone" className="flex items-center space-x-2">
                          <Smartphone className="h-4 w-4" />
                          <span>Code OTP</span>
                        </Label>
                        <Input
                          id="otp-phone"
                          type="text"
                          inputMode="numeric"
                          placeholder="123456"
                          maxLength={6}
                          value={otpCode}
                          onChange={(event) => setOtpCode(event.target.value)}
                          required
                        />
                      </div>

                      <div className="flex items-center justify-between space-x-4">
                        <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700" disabled={loading}>
                          Vérifier et se connecter
                        </Button>
                        <Button type="button" variant="ghost" onClick={handleResendOtp} disabled={loading}>
                          Renvoyer
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Numéro de téléphone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+221XXXXXXXXX"
                          value={phoneCredentials.telephone}
                          onChange={(event) => setPhoneCredentials({ ...phoneCredentials, telephone: event.target.value })}
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
                            value={phoneCredentials.password}
                            onChange={(event) => setPhoneCredentials({ ...phoneCredentials, password: event.target.value })}
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword((previous) => !previous)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                        Se connecter
                      </Button>
                    </form>
                  )}
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
