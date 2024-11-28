import '../../scss/Footer.scss';

const Footer = () => {
    return (
        <footer className="footer py-5 mt-5">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 mb-4">
                        <div className="logo bg-primary text-white p-3 d-inline-block rounded">
                            <h3>Holidaze</h3>
                        </div>
                    </div>
                    <div className="col-md-3 mb-4">
                        <h5>Holidaze</h5>
                        <ul className="list-unstyled">
                            <li>About us</li>
                            <li>Contact us</li>
                        </ul>
                    </div>
                    <div className="col-md-3 mb-4">
                        <h5>Terms & Policies</h5>
                        <ul className="list-unstyled">
                            <li>Terms & Conditions</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                    <div className="col-md-3 mb-4">
                        <h5>Helpful links</h5>
                        <ul className="list-unstyled">
                            <li>Support</li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <p>&copy; Holidaze 2024</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
