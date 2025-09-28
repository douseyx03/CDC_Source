import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Demandes totales',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: FileText
    },
    {
      title: 'Utilisateurs actifs',
      value: '856',
      change: '+8%',
      changeType: 'positive',
      icon: Users
    },
    {
      title: 'Volume traité',
      value: '45.2M FCFA',
      change: '+15%',
      changeType: 'positive',
      icon: DollarSign
    },
    {
      title: 'Temps moyen',
      value: '3.2 jours',
      change: '-5%',
      changeType: 'positive',
      icon: Clock
    }
  ];

  const recentRequests = [
    { id: 'CDC1245', user: 'Amadou Diallo', type: 'Consignation', status: 'En attente', amount: '2.5M', priority: 'Haute' },
    { id: 'CDC1246', user: 'Fatou Sall', type: 'Financement', status: 'Approuvé', amount: '15M', priority: 'Normale' },
    { id: 'CDC1247', user: 'Moussa Ba', type: 'Placement', status: 'En cours', amount: '5M', priority: 'Normale' },
    { id: 'CDC1248', user: 'Aïcha Ndiaye', type: 'Dépôt légal', status: 'Complété', amount: '500K', priority: 'Basse' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approuvé':
      case 'Complété':
        return 'bg-green-100 text-green-800';
      case 'En cours':
        return 'bg-yellow-100 text-yellow-800';
      case 'En attente':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Haute':
        return 'bg-red-100 text-red-800';
      case 'Normale':
        return 'bg-yellow-100 text-yellow-800';
      case 'Basse':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord administratif</h1>
          <p className="text-gray-600">Vue d'ensemble des activités CDC Sénégal</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change} par rapport au mois dernier
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Requests */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Demandes récentes</span>
                </CardTitle>
                <CardDescription>
                  Dernières demandes nécessitant une attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{request.user}</p>
                          <p className="text-sm text-gray-500">{request.type} - {request.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <p className="font-medium">{request.amount} FCFA</p>
                          <div className="flex space-x-2">
                            <Badge className={getStatusColor(request.status)}>
                              {request.status}
                            </Badge>
                            <Badge className={getPriorityColor(request.priority)}>
                              {request.priority}
                            </Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Traiter
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analytics & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Activité aujourd'hui</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Nouvelles demandes</span>
                  <span className="font-bold text-blue-600">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Demandes traitées</span>
                  <span className="font-bold text-green-600">18</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">En attente</span>
                  <span className="font-bold text-yellow-600">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Problèmes</span>
                  <span className="font-bold text-red-600">3</span>
                </div>
              </CardContent>
            </Card>

            {/* Service Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5" />
                  <span>Répartition des services</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Consignation</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '45%'}}></div>
                      </div>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Financement</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '30%'}}></div>
                      </div>
                      <span className="text-sm font-medium">30%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Investissement</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{width: '25%'}}></div>
                      </div>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Gérer les utilisateurs
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Valider les demandes
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Générer rapport
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Alertes système
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Performance Charts Section */}
        <div className="mt-8">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="requests">Demandes</TabsTrigger>
              <TabsTrigger value="users">Utilisateurs</TabsTrigger>
              <TabsTrigger value="financial">Financier</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Évolution mensuelle</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                      <p className="text-gray-500">Graphique d'évolution mensuelle</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Performance par service</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                      <p className="text-gray-500">Graphique de performance</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="requests">
              <Card>
                <CardHeader>
                  <CardTitle>Analyse des demandes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Graphique d'analyse des demandes</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Statistiques utilisateurs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Graphique des utilisateurs</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="financial">
              <Card>
                <CardHeader>
                  <CardTitle>Indicateurs financiers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Graphiques financiers</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}