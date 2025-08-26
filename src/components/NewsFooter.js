import ReportButton from './ReportButton';
import ShareButtonsInline from "./ShareButton";
import ShareButtonsInline2 from "./ShareButton2";

export default function NewsFooter({ siteAddress, link, newsId, title }) {
  
  return (
    <>
      <div className="px-4 py-4 sm:px-6 bg-gray-50 rounded-b-lg flex justify-between items-center">
        <div className="text-sm text-gray-500">
          آدرس سایت منبع: <a href={siteAddress} className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">{siteAddress}</a>
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
        >
          مشاهده در سایت منبع
        </a>

        <ReportButton newsId={newsId} link={link} />

      </div>
      
      {/* <ShareButtonsInline title={title} url={link} /> */}
      <div className="mt-4 mb-6">
        <ShareButtonsInline title={title} url={link} />
      </div>
      {/* <div className="mt-4 mb-6">
        <ShareButtonsInline2 title={title} url={link} />
      </div> */}


    </>
  );
}