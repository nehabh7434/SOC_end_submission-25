import {
  FaGithub,
  FaLinkedin,
  FaInstagram
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 text-sm text-center py-4 mt-6 border-t">
      <p>© 2025 Neha Bharti • Built with ❤️ using React & Tailwind CSS</p>

      <div className="flex justify-center gap-6 mt-2 text-blue-600 text-lg">
        <a href="https://github.com/nehabh7434" target="_blank" rel="noopener noreferrer" className="hover:text-black">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/neha-bharti-0a803b285?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">
          <FaLinkedin />
        </a>
        <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">
          <FaInstagram />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

