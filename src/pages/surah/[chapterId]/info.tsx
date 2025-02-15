import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { getChapterInfo } from 'src/api';
import InfoPage from 'src/components/chapters/Info/InfoPage';
import { getChapterData } from 'src/utils/chapter';
import {
  REVALIDATION_PERIOD_ON_ERROR_SECONDS,
  ONE_MONTH_REVALIDATION_PERIOD_SECONDS,
} from 'src/utils/staticPageGeneration';
import { isValidChapterId } from 'src/utils/validator';
import { ChapterInfoResponse, ChapterResponse } from 'types/ApiResponses';

interface Props {
  chapterResponse?: ChapterResponse;
  chapterInfoResponse?: ChapterInfoResponse;
  hasError?: boolean;
}

const ChapterInfo: NextPage<Props> = (props) => {
  return <InfoPage {...props} />;
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const chapterId = String(params.chapterId);
  // we need to validate the chapterId first to save calling BE since we haven't set the valid paths inside getStaticPaths to avoid pre-rendering them at build time.
  if (!isValidChapterId(chapterId)) {
    return {
      notFound: true,
    };
  }
  try {
    const chapterInfoResponse = await getChapterInfo(chapterId, locale);
    return {
      props: {
        chapterInfoResponse,
        chapterResponse: { chapter: getChapterData(chapterId, locale) },
      },
      revalidate: ONE_MONTH_REVALIDATION_PERIOD_SECONDS, // chapter info will be generated at runtime if not found in the cache, then cached for subsequent requests for 30 days.
    };
  } catch (error) {
    return {
      props: { hasError: true },
      revalidate: REVALIDATION_PERIOD_ON_ERROR_SECONDS, // 35 seconds will be enough time before we re-try generating the page again.
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [], // no pre-rendered chapters at build time.
  fallback: 'blocking', // will server-render pages on-demand if the path doesn't exist.
});

export default ChapterInfo;
