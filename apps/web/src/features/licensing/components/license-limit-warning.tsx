import Link from "next/link";
import { Trans } from "@/components/trans";
import { loadInstanceLicense } from "@/features/licensing/data";
import { getUserCount } from "@/features/user/queries";
import { isSelfHosted } from "@/utils/constants";

export async function LicenseLimitWarning() {
  if (!isSelfHosted) {
    return null;
  }

  const [license, userCount] = await Promise.all([
    loadInstanceLicense(),
    getUserCount(),
  ]);

  const userLimit = license?.seats ?? 1;

  if (license?.type === "ENTERPRISE" || userCount <= userLimit) {
    return null;
  }

  return (
    <div className="m-1 rounded-md bg-muted p-2 text-center text-muted-foreground text-sm">
      <Trans
        i18nKey="licenseLimitWarning"
        defaults="Welcome to bookday.us, an instance of Rallly: The open source availability poll app."
        components={{
          a: (
            <Link
              prefetch={false}
              href="https://support.rallly.co/self-hosting/licensing"
              target="_blank"
              className="text-link"
              rel="noopener noreferrer"
            />
          ),
        }}
      />
    </div>
  );
}
