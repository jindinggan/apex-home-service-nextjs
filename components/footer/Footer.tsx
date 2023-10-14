// components/Footer.tsx

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto text-center">
                <h4 className="text-2xl mb-4">Apex Home Service</h4>
                <p className="text-sm mb-4">© 2023, All rights reserved.</p>
                <div className="space-x-4">
                    <a href="#" className="text-gray-400 hover:text-white">
                        Terms & Conditions
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                        Privacy Policy
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                        Contact Us
                    </a>
                </div>
            </div>
        </footer>
    );
}
