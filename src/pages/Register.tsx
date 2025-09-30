import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Navbar from '@/components/Navbar';
import { User, Building, Landmark, Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    companyType: '',
    acceptTerms: false
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Simulate registration
    navigate('/login');
  };

  const accountTypes = [
    { value: 'individual', label: 'Particulier', icon: User, description: 'Compte personnel pour services de consignation et épargne' },
    { value: 'business', label: 'Entreprise', icon: Building, description: 'Compte professionnel pour PME et grandes entreprises' },
    { value: 'institution', label: 'Institution', icon: Landmark, description: 'Compte pour banques, assurances et partenaires financiers' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">CDC</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Créer votre compte</h2>
            <p className="mt-2 text-gray-600">Rejoignez la communauté CDC Sénégal</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Inscription</CardTitle>
              <CardDescription>
                Choisissez votre type de compte et remplissez vos informations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Account Type Selection */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Type de compte</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {accountTypes.map((type) => (
                      <div
                        key={type.value}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          accountType === type.value
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setAccountType(type.value)}
                      >
                        <div className="flex flex-col items-center text-center space-y-2">
                          <type.icon className={`h-8 w-8 ${
                            accountType === type.value ? 'text-blue-600' : 'text-gray-400'
                          }`} />
                          <h3 className="font-medium">{type.label}</h3>
                          <p className="text-xs text-gray-500">{type.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {accountType && (
                  <>
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+221 XX XXX XX XX"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    {/* Company Information for Business/Institution */}
                    {(accountType === 'business' || accountType === 'institution') && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="companyName">
                            {accountType === 'business' ? 'Nom de l\'entreprise' : 'Nom de l\'institution'} *
                          </Label>
                          <Input
                            id="companyName"
                            value={formData.companyName}
                            onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="companyType">Type d'organisation *</Label>
                          <Select onValueChange={(value) => setFormData({...formData, companyType: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez le type" />
                            </SelectTrigger>
                            <SelectContent>
                              {accountType === 'business' ? (
                                <>
                                  <SelectItem value="pme">PME</SelectItem>
                                  <SelectItem value="grande-entreprise">Grande entreprise</SelectItem>
                                  <SelectItem value="startup">Startup</SelectItem>
                                  <SelectItem value="cooperative">Coopérative</SelectItem>
                                </>
                              ) : (
                                <>
                                  <SelectItem value="banque">Banque</SelectItem>
                                  <SelectItem value="assurance">Assurance</SelectItem>
                                  <SelectItem value="microfinance">Microfinance</SelectItem>
                                  <SelectItem value="gouvernement">Institution gouvernementale</SelectItem>
                                </>
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    {/* Password */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password">Mot de passe *</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
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
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, acceptTerms: checked === true })
                        }
                      />
                      <Label htmlFor="terms" className="text-sm">
                        J'accepte les{' '}
                        <Link to="/terms" className="text-blue-600 hover:underline">
                          conditions d'utilisation
                        </Link>{' '}
                        et la{' '}
                        <Link to="/privacy" className="text-blue-600 hover:underline">
                          politique de confidentialité
                        </Link>
                      </Label>
                    </div>

                    <Alert>
                      <AlertDescription>
                        Votre compte sera vérifié sous 24-48h. Vous recevrez un email de confirmation.
                      </AlertDescription>
                    </Alert>

                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={!formData.acceptTerms}
                    >
                      Créer mon compte
                    </Button>
                  </>
                )}
              </form>

              <div className="mt-6 text-center text-sm text-gray-600">
                Déjà un compte ?{' '}
                <Link to="/login" className="text-blue-600 hover:underline font-medium">
                  Se connecter
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
