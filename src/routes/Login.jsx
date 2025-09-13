import { Link, Navigate } from 'react-router-dom';
import useUser from '../hooks/useUser';

import LoginButton from '../components/LoginButton';

import useLoginTransition from '../hooks/useLoginTransition';

export default function Login() {
  const { user } = useUser();
  const { isLoading, error } = useLoginTransition(false);

  return (
    <main>
      <section className="container py-8">
        {user ? (
          <Navigate to="/" />
        ) : isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>An error occured. Try reloading</div>
        ) : (
          <div>
            <LoginButton />
            <div className="mt-4 max-w-80 text-sm font-normal text-justify">
              <p className="mb-4">
                By signing in, the user ("you") allow One-26 ("us", "we") to
                create a folder in your account's Google Drive. We will upload
                all your recordings on that folder.
              </p>
              <p className="mb-4">
                We do not store any of your information in our own servers and
                storages. We simply allow users to create recordings and upload
                them on their own Google Drive storage on-the-fly.
              </p>
              <p className="mb-4">
                For concerns and suggestions, reach out at micoirvin@gmail.com.
              </p>

              <h1 className="font-bold text-lg mb-4">About One-26</h1>
              <p className="mb-4">
                Hello, my name is Mico, and I created One-26. My inspiration is
                a popular video recording and sharing service. On their free
                tier, they only allow 25 five-minute videos, which total to 125
                minutes of recording time. One-26 simply aims to allow users to
                record more than that.
              </p>
              <p className="mb-4">
                I am practicing my software development skills, too. That's why
                I created this. Hire me!
              </p>
              <h2 className="font-bold text-lg mb-4">Roadmap</h2>
              <p className="mb-4">
                There are still a lot to improve on the app.
              </p>
              <p className="mb-4">
                1. I will make uploading more robust by including pause and
                resume upload.
              </p>
              <p className="mb-4">
                2. I will include a section that shows the collection of
                recorded videos.
              </p>
              <p className="mb-4">
                3. I will include a link-sharing feature with permission
                adjustments to easily share videos as you create them.
              </p>
              <p className="mb-4">4. UI/UX can still be improved.</p>

              <h1 className="font-bold text-lg mb-4">Contact</h1>
              <p className="mb-4">Email me at micoirvin@gmail.com.</p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
