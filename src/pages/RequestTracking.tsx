import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import { 
  Search, 
  Eye, 
  Download, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Calendar,
  User,
  DollarSign
} from 'lucide-react';

export default function RequestTracking() {
  const [searchTerm, setSearchTerm] = useState('');
  const [requests] = useState([
    {
      id: 'CDC001',
      type: 'Consignation judiciaire',
      status: 'Approuvé',
      amount: '2,500,000 FCFA',
      submissionDate: '2024-01-15',
      lastUpdate: '2024-01-18',
      progress: 100,
      steps: [
        { name: 'Soumission', completed: true, date: '2024-01-15' },
        { name: 'Vérification documents', completed: true, date: '2024-01-16' },
        { name: 'Validation interne', completed: true, date: '2024-01-17' },
        { name: 'Approbation finale', completed: true, date: '2024-01-18' }
      ]
    },
    {
      id: 'CDC002',
      type: 'Financement PME',
      status: 'En cours',
      amount: '15,000,000 FCFA',
      submissionDate: '2024-01-10',
      lastUpdate: '2024-01-20',
      progress: 60,
      steps: [
        { name: 'Soumission', completed: true, date: '2024-01-10' },
        { name: 'Vérification documents', completed: true, date: '2024-01-12' },
        { name: 'Évaluation financière', completed: true, date: '2024-01-15' },
        { name: 'Comité de crédit', completed: false, date: null }
      ]
    },
    {
      id: 'CDC003',
      type: 'Dépôt légal',
      status: 'Complété',
      amount: '500,000 FCFA',
      submissionDate: '2024-01-08',
      lastUpdate: '2024-01-12',
      progress: 100,
      steps: [
        { name: 'Soumission', completed: true, date: '2024-01-08' },
        { name: 'Vérification conformité', completed: true, date: '2024-01-10' },
        { name: 'Enregistrement', completed: true, date: '2024-01-12' }
      ]
    },
    {
      id: 'CDC004',
      type: 'Placement obligataire',
      status: 'Document manquant',
      amount: '3,000,000 FCFA',
      submissionDate: '2024-01-20',
      lastUpdate: '2024-01-22',
      progress: 25,
      steps: [
        { name: 'Soumission', completed: true, date: '2024-01-20' },
        { name: 'Vérification documents', completed: false, date: null }
      ]
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approuvé':
      case 'Complété':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'En cours':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'Document manquant':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approuvé':
      case 'Complété':
        return 'bg-green-100 text-green-800';
      case 'En cours':
        return 'bg-yellow-100 text-yellow-800';
      case 'Document manquant':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRequests = requests.filter(request =>
    request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeRequests = requests.filter(r => r.status === 'En cours' || r.status === 'Document manquant');
  const completedRequests = requests.filter(r => r.status === 'Approuvé' || r.status === 'Complété');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Suivi des demandes</h1>
          <p className="text-gray-600">Suivez l'état d'avancement de vos dossiers en temps réel</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher par ID ou type de service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">
              Toutes ({requests.length})
            </TabsTrigger>
            <TabsTrigger value="active">
              En cours ({activeRequests.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Terminées ({completedRequests.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active">
            <div className="space-y-4">
              {activeRequests.filter(request =>
                request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.type.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((request) => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="space-y-4">
              {completedRequests.filter(request =>
                request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.type.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((request) => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );

  function RequestCard({ request }) {
    const [expanded, setExpanded] = useState(false);

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {getStatusIcon(request.status)}
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <span>{request.type}</span>
                  <Badge variant="outline">#{request.id}</Badge>
                </CardTitle>
                <CardDescription className="flex items-center space-x-4 mt-1">
                  <span className="flex items-center">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {request.amount}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {request.submissionDate}
                  </span>
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={getStatusColor(request.status)}>
                {request.status}
              </Badge>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? 'Réduire' : 'Détails'}
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        {expanded && (
          <CardContent>
            <div className="space-y-6">
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progression</span>
                  <span>{request.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${request.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="font-medium mb-4">Étapes du traitement</h4>
                <div className="space-y-4">
                  {request.steps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        step.completed 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Clock className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${
                          step.completed ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {step.name}
                        </p>
                        {step.date && (
                          <p className="text-sm text-gray-500">{step.date}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4 border-t">
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Voir les documents
                </Button>
                <Button variant="outline" size="sm">
                  <User className="mr-2 h-4 w-4" />
                  Contacter le conseiller
                </Button>
                {request.status === 'Document manquant' && (
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                    Compléter le dossier
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    );
  }
}