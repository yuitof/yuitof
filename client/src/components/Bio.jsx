export default function Bio() {
    return (
        <>
            <div className="relative isolate overflow-hidden bg-white p-10 lg:overflow-visible">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                <div className="lg:pr-4">
                    <div className="lg:max-w-lg">
                    <h1 className="mt-2 text-2xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-3xl">📸Profile</h1>
                    <p className="mt-6 text-xl/8 text-gray-700">Yuito Fujiwara / Motion Designer / Developer / An undergraduate @keio_st / I’m aspiring to be a CGI generalist and interested in computer science.</p>
                    <p className="mt-8">Feel free to get in touch with me via the contact form belwo, SNS, or email</p>
                    </div>
                </div>
                </div>
                <div className="-mt-12 -ml-12 p-20 lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                    <img src="https://aws-node-express-api-project-610040096594.s3.us-east-1.amazonaws.com/profile.jpg" alt="" className="w-3xl rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-228" />
                </div>
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:-mt-50">
                <div className="lg:pr-4">
                    <div className="max-w-xl text-base/7 text-gray-600 lg:max-w-lg">
                    <ul role="list" className="space-y-8 text-gray-600">
                        <li className="flex gap-x-3">
                        <span><strong className="font-semibold text-gray-900">CGI</strong> Adobe After Effects / Blender</span>
                        </li>
                        <li className="flex gap-x-3">
                        <span><strong className="font-semibold text-gray-900">Software development</strong> Ruby on Rails / JavaScript / Node.js / React</span>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </>
    );
}