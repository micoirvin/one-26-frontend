export default function About() {
  return (
    <>
      <section>
        <h1 className="font-bold text-lg mb-4">About One-26</h1>
        <p className="mb-4">Hello, my name is Mico, and I created One-26.</p>
        <p className="mb-4">
          My inspiration is a popular video recording and sharing service. On
          their free tier, they only allow 25 five-minute videos, which total to{' '}
          <strong>125 minutes of recording time</strong>.
        </p>
        <p className="mb-4">
          One-26 simply aims to allow users to
          <strong> record more than that</strong> by using their{' '}
          <strong>own Google Drive as the video storage</strong>.
        </p>
        <p className="mb-4">
          We simply allow users to create recordings and upload them on their
          own Google Drive storage on-the-fly.
        </p>

        <p className="mb-4">
          I am practicing my software development skills, too. That's why I
          created this. <strong>Hire me!</strong> &rarr; micoirvin@gmail.com
        </p>
      </section>
      <section>
        <h2 className="font-bold text-lg mb-4">Roadmap</h2>
        <p className="mb-4">There are still a lot to improve on the app.</p>
        <p className="mb-4">
          1. I will make uploading more robust by including pause and resume
          upload.
        </p>
        <p className="mb-4">
          2. I will include a section that shows the collection of recorded
          videos.
        </p>
        <p className="mb-4">
          3. I will include a link-sharing feature with permission adjustments
          to easily share videos as you create them.
        </p>
        <p className="mb-4">4. UI/UX can still be improved.</p>
      </section>
      <section>
        <h2 className="font-bold text-lg mb-4">Contact</h2>
        <p className="mb-4">Email me at micoirvin@gmail.com.</p>
      </section>
    </>
  );
}
