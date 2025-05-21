
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Youtube, 
  Twitter, // Changed from Tiktok to Twitter, which we'll use for TikTok
  Instagram, 
  Facebook, 
  MessageSquare
} from 'lucide-react';

const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { toast } = useToast();

  const handleAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAuthSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (activeTab === "signup" && authForm.password !== authForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive"
      });
      return;
    }

    // Simulate auth
    toast({
      title: activeTab === "login" ? "Login successful" : "Signup successful",
      description: activeTab === "login" 
        ? "You've been logged in successfully." 
        : "Your account has been created successfully.",
    });

    // In a real app, you would handle authentication here
    if (activeTab === "signup") {
      // After signup, automatically log them in
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      localStorage.setItem('isLoggedIn', 'true');
    }
  };

  return (
    <Card className="glass-morphism w-full max-w-md">
      <CardContent className="pt-6">
        <Tabs defaultValue="login" onValueChange={(value) => setActiveTab(value as "login" | "signup")} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input 
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="youremail@example.com"
                  required
                  className="rounded-lg"
                  value={authForm.email}
                  onChange={handleAuthChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input 
                  id="login-password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="rounded-lg"
                  value={authForm.password}
                  onChange={handleAuthChange}
                />
              </div>
              
              <Button type="submit" className="w-full rounded-lg btn-primary mt-4">
                Login
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input 
                  id="signup-email"
                  name="email"
                  type="email"
                  placeholder="youremail@example.com"
                  required
                  className="rounded-lg"
                  value={authForm.email}
                  onChange={handleAuthChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input 
                  id="signup-password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="rounded-lg"
                  value={authForm.password}
                  onChange={handleAuthChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                <Input 
                  id="signup-confirm-password"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="rounded-lg"
                  value={authForm.confirmPassword}
                  onChange={handleAuthChange}
                />
              </div>
              
              <Button type="submit" className="w-full rounded-lg btn-primary mt-4">
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const CreatorForm = () => {
  const [formData, setFormData] = useState({
    channelName: '',
    whatsappNumber: '',
    category: 'anime',
    userId: '',
    activationCode: '',
    channelLink: '',
    activePlatforms: [] as string[],
    followers: '',
    city: '',
    occupation: '',
    paymentMethod: '',
    paymentAccount: '',
    otherPayment: '',
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: value }));
  };

  const handlePlatformToggle = (platform: string) => {
    setFormData(prev => {
      const platforms = [...prev.activePlatforms];
      
      if (platforms.includes(platform)) {
        return { ...prev, activePlatforms: platforms.filter(p => p !== platform) };
      } else {
        return { ...prev, activePlatforms: [...platforms, platform] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (formData.activePlatforms.length === 0) {
      toast({
        title: "Platform selection required",
        description: "Please select at least one active platform.",
        variant: "destructive"
      });
      return;
    }

    if (formData.paymentMethod === "Other" && !formData.otherPayment) {
      toast({
        title: "Payment information missing",
        description: "Please specify your other payment method.",
        variant: "destructive"
      });
      return;
    }
    
    // Process form submission
    toast({
      title: "Form submitted successfully!",
      description: "We'll review your application and get back to you soon.",
    });
    
    console.log("Form Data:", formData);
  };

  return (
    <Card className="glass-morphism w-full max-w-2xl mt-8">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">Creator Application Form</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="channelName" className="text-white">Nama Channel (Bstation)</Label>
            <Input 
              id="channelName"
              name="channelName"
              placeholder="Your channel name"
              required
              className="rounded-lg"
              value={formData.channelName}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsappNumber" className="text-white">Nomor Whatsapp</Label>
            <Input 
              id="whatsappNumber"
              name="whatsappNumber"
              placeholder="628xxxxxxxxxx"
              required
              className="rounded-lg"
              value={formData.whatsappNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Kategori</Label>
            <RadioGroup 
              defaultValue="anime" 
              value={formData.category}
              onValueChange={handleCategoryChange}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="anime" id="anime" />
                <Label htmlFor="anime" className="text-white">Anime</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="game" id="game" />
                <Label htmlFor="game" className="text-white">Game</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other" className="text-white">Lainnya</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="userId" className="text-white">UID (User ID, bisa cek di profile)</Label>
            <Input 
              id="userId"
              name="userId"
              placeholder="Your User ID"
              required
              className="rounded-lg"
              value={formData.userId}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="activationCode" className="text-white">Kode Aktivasi</Label>
            <Input 
              id="activationCode"
              name="activationCode"
              placeholder="Enter activation code"
              required
              className="rounded-lg"
              value={formData.activationCode}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="channelLink" className="text-white">Link Channel kamu (YT / Tiktok / Platform Lain)</Label>
            <Input 
              id="channelLink"
              name="channelLink"
              placeholder="https://"
              required
              className="rounded-lg"
              value={formData.channelLink}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Di Platform apa paling aktif (pilih minimal satu)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="youtube" 
                  checked={formData.activePlatforms.includes('youtube')}
                  onCheckedChange={() => handlePlatformToggle('youtube')}
                />
                <Label htmlFor="youtube" className="flex items-center space-x-1 text-white">
                  <Youtube className="h-4 w-4" />
                  <span>Youtube</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="tiktok" 
                  checked={formData.activePlatforms.includes('tiktok')}
                  onCheckedChange={() => handlePlatformToggle('tiktok')}
                />
                <Label htmlFor="tiktok" className="flex items-center space-x-1 text-white">
                  <Twitter className="h-4 w-4" /> {/* Using Twitter icon for TikTok temporarily */}
                  <span>Tiktok</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="instagram" 
                  checked={formData.activePlatforms.includes('instagram')}
                  onCheckedChange={() => handlePlatformToggle('instagram')}
                />
                <Label htmlFor="instagram" className="flex items-center space-x-1 text-white">
                  <Instagram className="h-4 w-4" />
                  <span>Instagram</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="snapchat" 
                  checked={formData.activePlatforms.includes('snapchat')}
                  onCheckedChange={() => handlePlatformToggle('snapchat')}
                />
                <Label htmlFor="snapchat" className="flex items-center space-x-1 text-white">
                  <MessageSquare className="h-4 w-4" />
                  <span>Snapchat</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="facebook" 
                  checked={formData.activePlatforms.includes('facebook')}
                  onCheckedChange={() => handlePlatformToggle('facebook')}
                />
                <Label htmlFor="facebook" className="flex items-center space-x-1 text-white">
                  <Facebook className="h-4 w-4" />
                  <span>Facebook</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="twitter" 
                  checked={formData.activePlatforms.includes('twitter')}
                  onCheckedChange={() => handlePlatformToggle('twitter')}
                />
                <Label htmlFor="twitter" className="text-white">X (Twitter)</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="followers" className="text-white">Jumlah Follower / Subscriber</Label>
            <Input 
              id="followers"
              name="followers"
              placeholder="e.g. 5000"
              required
              className="rounded-lg"
              value={formData.followers}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city" className="text-white">Dikota mana kamu tinggal</Label>
            <Input 
              id="city"
              name="city"
              placeholder="Nama kota"
              required
              className="rounded-lg"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="occupation" className="text-white">Pekerjaan sehari-hari</Label>
            <Input 
              id="occupation"
              name="occupation"
              placeholder="Pekerjaan kamu"
              required
              className="rounded-lg"
              value={formData.occupation}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Rekening/Ewallet</Label>
            <RadioGroup 
              value={formData.paymentMethod}
              onValueChange={handlePaymentMethodChange}
              className="space-y-2"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Gopay" id="gopay" />
                  <Label htmlFor="gopay" className="text-white">Gopay</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Ovo" id="ovo" />
                  <Label htmlFor="ovo" className="text-white">Ovo</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="DANA" id="dana" />
                  <Label htmlFor="dana" className="text-white">DANA</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ShopeePay" id="shopeepay" />
                  <Label htmlFor="shopeepay" className="text-white">ShopeePay</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="BRI" id="bri" />
                  <Label htmlFor="bri" className="text-white">BRI</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="BCA" id="bca" />
                  <Label htmlFor="bca" className="text-white">BCA</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="BNI" id="bni" />
                  <Label htmlFor="bni" className="text-white">BNI</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Mandiri" id="mandiri" />
                  <Label htmlFor="mandiri" className="text-white">Mandiri</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Other" id="other_payment" />
                  <Label htmlFor="other_payment" className="text-white">Other</Label>
                </div>
              </div>

              {formData.paymentMethod === "Other" && (
                <Input 
                  id="otherPayment"
                  name="otherPayment"
                  placeholder="Specify payment method"
                  className="rounded-lg mt-2"
                  value={formData.otherPayment}
                  onChange={handleInputChange}
                />
              )}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentAccount" className="text-white">Rekening/Ewallet dan atas nama (xxx-a/n)</Label>
            <Input 
              id="paymentAccount"
              name="paymentAccount"
              placeholder="e.g. 1234567890 a/n John Doe"
              required
              className="rounded-lg"
              value={formData.paymentAccount}
              onChange={handleInputChange}
            />
          </div>

          <Button type="submit" className="w-full rounded-lg btn-primary">
            Submit Application
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const FormPage = () => {
  return (
    <div className="min-h-screen bg-gradient-purple-blue flex flex-col items-center justify-center p-4 py-10">
      <AuthTabs />
      <CreatorForm />
    </div>
  );
};

export default FormPage;
