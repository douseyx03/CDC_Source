import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/Navbar';
import { 
  TrendingUp, 
  FileText, 
  CreditCard, 
  Bell, 
  Download,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign
} from 'lucide-react';

export default function Dashboard() {
  const [notifications] = useState([
    { id: 1, type: 'success', message: 'Votre dossier de consignation #CDC001 a été approuvé', time: '2h' },
    { id: 2, type: 'info', message: 'Nouveau service de financement disponible', time: '1j' },
    { id: 3, type: 'warning', message: 'Document manquant pour la demande #CDC002', time: '2j' }
  ]);

  const [recentRequests] = useState([
    { id: 'CDC001', type: 'Consignation judiciaire', status: 'Approuvé', amount: '2,500,000 FCFA', date: '2024-01-15' },
    { id: 'CDC002', type: 'Financement PME', status: 'En cours', amount: '15,000,000 FCFA', date: '2024-01-10' },
    { id: 'CDC003', type: 'Dépôt légal', status: 'Complété', amount: '500,000 FCFA', date: '2024-01-08' }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approuvé':
      case 'Complété':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'En cours':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approuvé':
      case 'Complété':
        return 'bg-green-100 text-green-800';
      case 'En cours':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600">Bienvenue, Jean Dupont</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Solde total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25,750,000 FCFA</div>
              <p className="text-xs text-muted-foreground">
                +12% par rapport au mois dernier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Demandes actives</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                3 en attente de validation
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Investissements</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                Rendement moyen: +8.5%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                Ce mois-ci
              </p>
            </CardContent>
          </Card>
        </div>

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
                  Suivi de vos dernières demandes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(request.status)}
                        <div>
                          <p className="font-medium">{request.type}</p>
                          <p className="text-sm text-gray-500">ID: {request.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{request.amount}</p>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    Voir toutes les demandes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications & Quick Actions */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">Il y a {notification.time}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Voir toutes les notifications
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Nouvelle demande
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Effectuer un paiement
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger documents
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Voir investissements
                </Button>
              </CardContent>
            </Card>

            {/* Account Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Profil du compte</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Profil complété</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>✓ Informations personnelles</p>
                    <p>✓ Vérification d'identité</p>
                    <p>✗ Documents complémentaires</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Compléter le profil
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}