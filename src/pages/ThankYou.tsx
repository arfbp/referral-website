import React from 'react';
import NavigationMenu from '@/components/NavigationMenu';
import { Card, CardContent } from '@/components/ui/card';
const ThankYou = () => {
  return <div className="min-h-screen bg-gradient-purple-blue flex flex-col overflow-y-auto">
      <NavigationMenu />
      <div className="flex flex-col items-center pt-20 py-10 px-4 md:px-8">
        <div className="w-full max-w-2xl">
          <Card className="glass-morphism w-full">
            <CardContent className="pt-6">
              <h2 className="font-semibold mb-6 text-center text-white text-2xl">TERIMAKASIH ATAS KETERSEDIAAN KAMU MENGISI FORM REGISTRASI</h2>
              
              <div className="text-white space-y-4">
                
                
                <p>
                  Setelah ini harap siapkan segera konten TERBAIK kamu dengan syarat :
                </p>
                
                <div className="space-y-3 ml-4">
                  <p>
                    <strong>1. Untuk video :</strong> Upload 4 video segera, durasi minimal 30 detik, harap fokus pada 1 kategori saja.
                  </p>
                  <p>
                    <strong>2. Untuk Post and Blog :</strong> Upload 2 konten blog atau post image.
                  </p>
                </div>
                
                <p className="pt-4">Kami akan review konten kamu jika berkualitas (Max 5 hari kerja)
Kamu akan diundang ke grup potensi Bstation</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
};
export default ThankYou;