// import { NextResponse } from "next/server";

// interface ApiResponse {
//   userId?: string;
//   message: string;
// }

// export async function GET(request: Request) {
//   const userId = request.headers.get("user-id");

//   if (!userId) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   const response: ApiResponse = {
//     userId,
//     message: "Protected data",
//   };

//   return NextResponse.json(response, { status: 200 });
// }
