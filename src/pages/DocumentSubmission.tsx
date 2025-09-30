import { ChangeEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Navbar from '@/components/Navbar';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  X,
  Plus,
  Eye
} from 'lucide-react';

type ServiceType =
  | 'consignation-judiciaire'
  | 'depot-legal'
  | 'financement-pme'
  | 'credit-immobilier'
  | 'placement-obligataire'
  | 'fonds-investissement';

type RequestType = 'nouveau' | 'renouvellement' | 'modification' | '';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

interface SubmissionFormData {
  serviceType: ServiceType | '';
  requestType: RequestType;
  amount: string;
  description: string;
  urgency: boolean;
  documents: UploadedFile[];
  personalInfo: PersonalInfo;
}

interface UploadedFile {
  id: number;
  name: string;
  size: number;
  type: string;
  file: File;
}

export default function DocumentSubmission() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SubmissionFormData>({
    serviceType: '',
    requestType: '',
    amount: '',
    description: '',
    urgency: false,
    documents: [],
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: ''
    }
  });

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const steps = [
    { id: 1, title: 'Type de service', description: 'Sélectionnez le service souhaité' },
    { id: 2, title: 'Informations', description: 'Détails de votre demande' },
    { id: 3, title: 'Documents', description: 'Téléchargement des pièces' },
    { id: 4, title: 'Vérification', description: 'Validation finale' }
  ];

  const serviceTypes: Array<{ value: ServiceType; label: string }> = [
    { value: 'consignation-judiciaire', label: 'Consignation judiciaire' },
    { value: 'depot-legal', label: 'Dépôt légal' },
    { value: 'financement-pme', label: 'Financement PME' },
    { value: 'credit-immobilier', label: 'Crédit immobilier' },
    { value: 'placement-obligataire', label: 'Placement obligataire' },
    { value: 'fonds-investissement', label: 'Fonds d\'investissement' }
  ];

  const requiredDocuments: Record<ServiceType, string[]> = useMemo(() => ({
    'consignation-judiciaire': ['Décision de justice', 'Pièce d\'identité', 'Justificatif de domicile'],
    'depot-legal': ['Acte constitutif', 'Registre de commerce', 'Statuts'],
    'financement-pme': ['Business plan', 'États financiers', 'Garanties'],
    'credit-immobilier': ['Titre foncier', 'Devis détaillé', 'Bulletins de salaire'],
    'placement-obligataire': ['Profil investisseur', 'Justificatifs de revenus'],
    'fonds-investissement': ['Questionnaire investisseur', 'Justificatifs financiers']
  }), []);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const files = Array.from(event.target.files);
    const newFiles = files.map<UploadedFile>((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file
    }));
    setUploadedFiles((previous) => [...previous, ...newFiles]);
  };

  const removeFile = (fileId: number) => {
    setUploadedFiles((previous) => previous.filter((file) => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Simulate submission
    navigate('/track-requests');
  };

  const progressPercentage = (currentStep / 4) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Soumettre une demande</h1>
          <p className="text-gray-600">Suivez les étapes pour déposer votre dossier en ligne</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.id ? <CheckCircle className="h-5 w-5" /> : step.id}
                </div>
                <div className="text-center mt-2">
                  <p className="text-sm font-medium">{step.title}</p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Étape {currentStep} : {steps[currentStep - 1].title}</CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Step 1: Service Type */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="serviceType">Type de service *</Label>
                  <Select
                    onValueChange={(value) =>
                      setFormData((previous) => ({
                        ...previous,
                        serviceType: value as ServiceType
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un service" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((service) => (
                        <SelectItem key={service.value} value={service.value}>
                          {service.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.serviceType && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Documents requis pour ce service : {requiredDocuments[formData.serviceType]?.join(', ')}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {/* Step 2: Request Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Montant (FCFA)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Ex: 1000000"
                      value={formData.amount}
                    onChange={(event) =>
                      setFormData((previous) => ({
                        ...previous,
                        amount: event.target.value
                      }))
                    }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="requestType">Type de demande</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData((previous) => ({
                          ...previous,
                          requestType: value as RequestType
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nouveau">Nouvelle demande</SelectItem>
                        <SelectItem value="renouvellement">Renouvellement</SelectItem>
                        <SelectItem value="modification">Modification</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description détaillée *</Label>
                  <Textarea
                    id="description"
                    placeholder="Décrivez votre demande en détail..."
                    rows={4}
                    value={formData.description}
                    onChange={(event) =>
                      setFormData((previous) => ({
                        ...previous,
                        description: event.target.value
                      }))
                    }
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="urgency"
                    checked={formData.urgency}
                    onCheckedChange={(checked) =>
                      setFormData((previous) => ({
                        ...previous,
                        urgency: checked === true
                      }))
                    }
                  />
                  <Label htmlFor="urgency">Demande urgente (traitement prioritaire)</Label>
                </div>
              </div>
            )}

            {/* Step 3: Document Upload */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Télécharger vos documents
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Glissez-déposez vos fichiers ou cliquez pour sélectionner
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Label htmlFor="file-upload">
                    <Button variant="outline" className="cursor-pointer">
                      <Plus className="mr-2 h-4 w-4" />
                      Sélectionner des fichiers
                    </Button>
                  </Label>
                  <p className="text-xs text-gray-500 mt-2">
                    Formats acceptés: PDF, DOC, DOCX, JPG, PNG (max 10MB par fichier)
                  </p>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium">Fichiers téléchargés ({uploadedFiles.length})</h4>
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-sm">{file.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => removeFile(file.id)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Verification */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Vérifiez toutes les informations avant de soumettre votre demande.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Service demandé</h4>
                    <p>{serviceTypes.find(s => s.value === formData.serviceType)?.label}</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Montant</h4>
                    <p>{formData.amount ? `${parseInt(formData.amount).toLocaleString()} FCFA` : 'Non spécifié'}</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Description</h4>
                    <p>{formData.description || 'Aucune description'}</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Documents joints</h4>
                    <p>{uploadedFiles.length} fichier(s) téléchargé(s)</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Précédent
              </Button>
              
              {currentStep < 4 ? (
                <Button 
                  onClick={nextStep}
                  disabled={currentStep === 1 && !formData.serviceType}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Suivant
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Soumettre la demande
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
