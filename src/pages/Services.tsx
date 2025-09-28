import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import { 
  Building2, 
  TrendingUp, 
  Shield, 
  Users, 
  FileText,
  Calculator,
  Clock,
  CheckCircle,
  ArrowRight,
  Info
} from 'lucide-react';

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const services = [
    {
      id: 1,
      category: 'consignation',
      title: 'Consignation judiciaire',
      description: 'Dépôt sécurisé de fonds ou valeurs ordonné par décision de justice',
      icon: Shield,
      features: ['Sécurité maximale', 'Traçabilité complète', 'Conformité légale'],
      duration: '24-48h',
      minAmount: '50,000 FCFA',
      documents: ['Décision de justice', 'Pièce d\'identité', 'Justificatif de domicile'],
      popular: true
    },
    {
      id: 2,
      category: 'consignation',
      title: 'Dépôts légaux',
      description: 'Dépôts obligatoires prévus par la loi (cautions, garanties)',
      icon: FileText,
      features: ['Conformité réglementaire', 'Gestion automatisée', 'Attestations officielles'],
      duration: '2-5 jours',
      minAmount: '100,000 FCFA',
      documents: ['Acte constitutif', 'Registre de commerce', 'Statuts']
    },
    {
      id: 3,
      category: 'financement',
      title: 'Financement PME',
      description: 'Solutions de financement adaptées aux petites et moyennes entreprises',
      icon: TrendingUp,
      features: ['Taux préférentiels', 'Accompagnement personnalisé', 'Délais rapides'],
      duration: '2-4 semaines',
      minAmount: '5,000,000 FCFA',
      documents: ['Business plan', 'États financiers', 'Garanties'],
      popular: true
    },
    {
      id: 4,
      category: 'financement',
      title: 'Crédit immobilier',
      description: 'Financement pour l\'acquisition ou la construction immobilière',
      icon: Building2,
      features: ['Jusqu\'à 25 ans', 'Taux fixe ou variable', 'Assurance incluse'],
      duration: '3-6 semaines',
      minAmount: '10,000,000 FCFA',
      documents: ['Titre foncier', 'Devis détaillé', 'Bulletins de salaire']
    },
    {
      id: 5,
      category: 'investissement',
      title: 'Placements obligataires',
      description: 'Investissement dans les obligations d\'État et corporate',
      icon: Calculator,
      features: ['Rendement garanti', 'Diversification', 'Liquidité'],
      duration: '1-3 jours',
      minAmount: '1,000,000 FCFA',
      documents: ['Profil investisseur', 'Justificatifs de revenus']
    },
    {
      id: 6,
      category: 'investissement',
      title: 'Fonds d\'investissement',
      description: 'Participation dans des fonds diversifiés gérés par des experts',
      icon: Users,
      features: ['Gestion professionnelle', 'Diversification', 'Performance optimisée'],
      duration: '5-10 jours',
      minAmount: '500,000 FCFA',
      documents: ['Questionnaire investisseur', 'Justificatifs financiers']
    }
  ];

  const categories = [
    { id: 'all', name: 'Tous les services', count: services.length },
    { id: 'consignation', name: 'Consignation', count: services.filter(s => s.category === 'consignation').length },
    { id: 'financement', name: 'Financement', count: services.filter(s => s.category === 'financement').length },
    { id: 'investissement', name: 'Investissement', count: services.filter(s => s.category === 'investissement').length }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nos Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre gamme complète de services financiers adaptés à vos besoins
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-2">
                <span>{category.name}</span>
                <Badge variant="secondary" className="ml-2">{category.count}</Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <Card key={service.id} className="relative hover:shadow-lg transition-shadow duration-300">
                    {service.popular && (
                      <Badge className="absolute -top-2 -right-2 bg-orange-500 hover:bg-orange-600">
                        Populaire
                      </Badge>
                    )}
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-3">
                        <service.icon className="h-8 w-8 text-blue-600" />
                        <div>
                          <CardTitle className="text-lg">{service.title}</CardTitle>
                          <CardDescription className="text-sm">
                            {service.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Features */}
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-2">Avantages :</h4>
                          <ul className="space-y-1">
                            {service.features.map((feature, index) => (
                              <li key={index} className="flex items-center text-sm text-gray-600">
                                <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Service Details */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="flex items-center text-gray-500 mb-1">
                              <Clock className="h-3 w-3 mr-1" />
                              Délai
                            </div>
                            <p className="font-medium">{service.duration}</p>
                          </div>
                          <div>
                            <div className="flex items-center text-gray-500 mb-1">
                              <Calculator className="h-3 w-3 mr-1" />
                              Montant min.
                            </div>
                            <p className="font-medium">{service.minAmount}</p>
                          </div>
                        </div>

                        {/* Required Documents */}
                        <div>
                          <div className="flex items-center text-gray-500 mb-2">
                            <FileText className="h-3 w-3 mr-1" />
                            <span className="text-sm">Documents requis :</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {service.documents.slice(0, 2).map((doc, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {doc}
                              </Badge>
                            ))}
                            {service.documents.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{service.documents.length - 2} autres
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-2 pt-4">
                          <Link to="/submit-document" className="flex-1">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                              Faire une demande
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm">
                            <Info className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Besoin d'aide pour choisir ?</h2>
          <p className="text-xl mb-6 opacity-90">
            Nos conseillers sont là pour vous accompagner dans vos démarches
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Prendre rendez-vous
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Nous contacter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}