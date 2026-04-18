import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { useState } from "react";

import { Badge } from "../../components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useTranslation } from "react-i18next";

export default function Dashboardlayout() {
  const { t } = useTranslation();

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid md:grid-cols-2 grid-cols-1  gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{t("Total Revenue")}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $1,250.00
          </CardTitle>
          <Badge variant="">
            <IconTrendingUp />
            +12.5%
          </Badge>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {t("Trending up this month")} <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {t("Visitors for the last 6 months")}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{t("New Customers")}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1,234
          </CardTitle>
          <Badge variant="">
            <IconTrendingDown />
            -20%
          </Badge>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {t("Down 20% this period")} <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {t("Acquisition needs attention")}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{t("Active Accounts")}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            45,678
          </CardTitle>
          <Badge variant="">
            <IconTrendingUp />
            +12.5%
          </Badge>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {t("Strong user retention")} <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {t("Engagement exceed targets")}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{t("Growth Rate")}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            4.5%
          </CardTitle>
          <Badge variant="">
            <IconTrendingUp />
            +4.5%
          </Badge>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {t("Steady performance increase")}{" "}
            <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {t("Meets growth projections")}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
