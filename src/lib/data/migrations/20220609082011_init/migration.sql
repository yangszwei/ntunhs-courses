-- CreateTable
CREATE TABLE "Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "semester" TEXT NOT NULL,
    "highlights" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "lecturers" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "weeks" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "remark" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    CONSTRAINT "Course_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "class" TEXT NOT NULL
);
