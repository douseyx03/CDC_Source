import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { 
  Building2, 
  Shield, 
  TrendingUp, 
  Users, 
  FileText, 
  CreditCard,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

export default function Index() {
  const services = [
    {
      icon: Building2,
      title: 'Consignation',
      description: 'Services de consignation judiciaire et dépôts légaux sécurisés',
      color: 'text-blue-600'
    },
    {
      icon: TrendingUp,
      title: 'Financement',
      description: 'Solutions de financement pour entreprises et projets d\'investissement',
      color: 'text-green-600'
    },
    {
      icon: Shield,
      title: 'Immobilier',
      description: 'Gestion et développement de patrimoine immobilier',
      color: 'text-purple-600'
    },
    {
      icon: Users,
      title: 'Investissements',
      description: 'Opportunités d\'investissement et gestion d\'actifs',
      color: 'text-orange-600'
    }
  ];

  const features = [
    {
      icon: FileText,
      title: 'Dématérialisation',
      description: 'Soumission et suivi de vos dossiers en ligne'
    },
    {
      icon: CreditCard,
      title: 'Paiements digitaux',
      description: 'Intégration Orange Money, Wave, cartes bancaires'
    },
    {
      icon: Shield,
      title: 'Sécurité renforcée',
      description: 'Authentification forte et données chiffrées'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bienvenue sur la plateforme
              <span className="block text-yellow-300">CDC Sénégal</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Votre partenaire de confiance pour la consignation, le financement et l'investissement au Sénégal
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                  Créer un compte
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                  Découvrir nos services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des solutions financières complètes adaptées à vos besoins
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <service.icon className={`h-12 w-12 mx-auto mb-4 ${service.color}`} />
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir CDC Sénégal ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une plateforme moderne, sécurisée et accessible 24h/24
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <feature.icon className="h-16 w-16 mx-auto mb-6 text-blue-600" />
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à commencer ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers d'utilisateurs qui font confiance à CDC Sénégal
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
              Créer votre compte maintenant
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">CDC</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">CDC Sénégal</h3>
                  <p className="text-sm text-gray-400">Caisse des Dépôts et Consignations</p>
                </div>
              </div>
              <p className="text-gray-400">
                Institution financière de référence au service du développement économique du Sénégal.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+221 33 XXX XX XX</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>contact@cdc.sn</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Dakar, Sénégal</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Liens utiles</h4>
              <div className="space-y-2">
                <Link to="/services" className="block text-gray-400 hover:text-white">Nos services</Link>
                <Link to="/login" className="block text-gray-400 hover:text-white">Connexion</Link>
                <Link to="/register" className="block text-gray-400 hover:text-white">Inscription</Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 CDC Sénégal. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}