export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-lg font-bold mb-4">LIVE हिन्दुस्तान</h3>
              <p className="text-gray-300 text-sm">
                भारत का सबसे विश्वसनीय हिंदी न्यूज पोर्टल। ताजा समाचार, ब्रेकिंग न्यूज और विश्लेषण।
              </p>
            </div>
  
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">जल्दी लिंक</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">होम पेज</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ताजा खबर</a></li>
                <li><a href="#" className="hover:text-white transition-colors">मनोरंजन</a></li>
                <li><a href="#" className="hover:text-white transition-colors">खेल</a></li>
              </ul>
            </div>
  
            {/* Categories */}
            <div>
              <h4 className="font-semibold mb-4">श्रेणियाँ</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">राजनीति</a></li>
                <li><a href="#" className="hover:text-white transition-colors">व्यापार</a></li>
                <li><a href="#" className="hover:text-white transition-colors">तकनीक</a></li>
                <li><a href="#" className="hover:text-white transition-colors">स्वास्थ्य</a></li>
              </ul>
            </div>
  
            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">संपर्क करें</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>ईमेल: contact@livehindustan.com</li>
                <li>फोन: +91-XXX-XXXX</li>
                <li>पता: नई दिल्ली, भारत</li>
              </ul>
            </div>
          </div>
  
          {/* Copyright */}
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
            <p>© 2024 LIVE हिन्दुस्तान. सभी अधिकार सुरक्षित।</p>
          </div>
        </div>
      </footer>
    );
  }