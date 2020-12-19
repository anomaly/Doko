type DokoTag = "environment" | "title" | "subtitle" | "fact" | "report";

const getDokoTag = (tagName: DokoTag): HTMLMetaElement | null => {
  return document.querySelector<HTMLMetaElement>(
    `meta[name="doko:${tagName}"]`
  );
};
const getDokoTags = (tagName: DokoTag): Array<HTMLMetaElement> | null => {
  return Array.from(
    document.querySelectorAll<HTMLMetaElement>(`meta[name="doko:${tagName}"]`)
  );
};

export const getEnvironment = (): String | null => {
  const tag = getDokoTag("environment");
  if (tag) {
    return tag.content;
  } else {
    return null;
  }
};

export const getTitle = (): String | null => {
  const tag = getDokoTag("title");
  if (tag) {
    return tag.content;
  } else {
    return null;
  }
};

export const getSubtitle = (): String | null => {
  const tag = getDokoTag("subtitle");
  if (tag) {
    return tag.content;
  } else {
    return null;
  }
};

export const getFacts = (): Array<String> | null => {
  const tags = getDokoTags("fact");
  if (tags) {
    return tags.map((tag) => tag.content);
  } else {
    return null;
  }
};

export const getReport = (): String | null => {
  const tag = getDokoTag("report");
  if (tag) {
    return tag.content;
  } else {
    return null;
  }
};
