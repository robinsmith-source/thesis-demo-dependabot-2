import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  User,
  Link,
} from "@nextui-org/react";
import { RecipeReview } from "@prisma/client";
import ReviewRating from "~/app/_components/ReviewRating";

export default function ReviewCard({ review }: { review: RecipeReview }) {
  const { rating, comment, author } = review;

  return (
    <Card className="w-96">
      <CardHeader>
        <ReviewRating rating={rating} />
      </CardHeader>
      <CardBody>{comment}</CardBody>
      <CardFooter className="flex justify-end">
        <User
          name={
            <Link
              color="secondary"
              href={`/user/${author.id}`}
              showAnchorIcon
              size="sm"
            >
              {author.name}
            </Link>
          }
          avatarProps={{
            src: author.image,
            size: "sm",
          }}
        />
      </CardFooter>
    </Card>
  );
}
