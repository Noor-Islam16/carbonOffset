import { Button } from "../components/ui/button";
import {
    CardTitle,
    CardHeader,
    CardContent,
    Card,
} from "../components/ui/card";
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import {
    TableHead,
    TableRow,
    TableHeader,
    TableCell,
    TableBody,
    Table,
} from "../components/ui/table";
import { FaArrowUp } from "react-icons/fa6";
import AddProject from "../components/AddProject";
import { useEffect, useState } from "react";
import { getAdminData } from "../api/admin";
import { Coins, MoveLeftIcon, MoveRight, Plus, Search } from "lucide-react";
import { getFarmOnboard } from "../api/farmOnboard";
import { getAllUsers } from "../api/auth/getUser";

interface ProjectData {
    name: string;
    location: string;
    status: string;
    userCount: number;
    _id: string;
    image: string;
}

export default function AdminUsers() {
    const [projectData, setProjectData] = useState<ProjectData[]>([]);
    const [dashBoardData, setDashBoardData] = useState<any>([]);
    const [approvedFarmData, setApprovedFarmData] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allUsers, setAllUsers] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(20); // Number of users per page
    const [searchTerm, setSearchTerm] = useState(""); // Search term state

    const handleAddProject = () => {
        setIsModalOpen(true);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        const fetchAdminData = async () => {
            const res = await getAdminData();
            setProjectData(res.data.allProjects);
            setDashBoardData(res.data);
        };

        const fetchFarmData = async () => {
            try {
                const res = await getFarmOnboard();
                const approvedFarms = res.data.filter(
                    (farm: any) => farm.approvedByAdmin
                );

                setApprovedFarmData(approvedFarms.length);
            } catch (error) {
                console.error("Failed to fetch farm data", error);
            }
        };

        const fetchUsers = async () => {
            try {
                const res = await getAllUsers();
                setAllUsers(res.data);
            } catch (error) {
                console.error("Failed to fetch all users", error);
            }
        };

        fetchAdminData();
        fetchFarmData();
        fetchUsers();
    }, []);

    // Filter users based on search term
    const filteredUsers = allUsers.filter((user: any) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get the current users to display based on pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const nextPage = () => setCurrentPage(prevPage => prevPage + 1);
    const prevPage = () => setCurrentPage(prevPage => prevPage - 1);

    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                <AdminSidebar />
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
                    <Link className="lg:hidden" to="#">
                        <Package2Icon className="h-6 w-6" />
                        <span className="sr-only">Users</span>
                    </Link>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-black/[0.05]">
                    <div className="grid h-[20vh] gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {/* Cards for Dashboard */}
                        <Card className="shadow-xl bg-green-300">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-md font-bold text-black">
                                    Total User
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-black">
                                    {dashBoardData?.totalUsers || 0}
                                </div>
                            </CardContent>
                            <CardContent>
                                <div className="flex gap-2 items-center">
                                    <FaArrowUp color="green" />
                                    <h1>
                                        <span className="text-green-600">{Math.abs(dashBoardData?.percentageUserIncrease) || 0}</span> % vs last month
                                    </h1>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="shadow-xl">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-md font-bold text-black">
                                    Total Farm Onboarded
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-black">{approvedFarmData || 0}</div>
                            </CardContent>
                        </Card>
                        <Card className="shadow-xl bg-green-300">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-md font-bold text-black">
                                    Active Projects
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-black">
                                    {dashBoardData?.totalProjects || 0}
                                </div>
                            </CardContent>
                            <CardContent>
                                <div className="flex gap-2 items-center">
                                    <FaArrowUp color="green" />
                                    <h1>
                                        <span className="text-green-600">{Math.floor(Math.abs(dashBoardData?.projectCountPerMonth))}</span> % vs last month
                                    </h1>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="border shadow-sm rounded-lg p-4 mt-6 bg-white">
                        <div className="flex flex-row justify-between">
                            <h2 className="font-bold text-2xl mb-4">Active Users</h2>
                            <div className="flex flex-row items-center gap-2 border border-gray-300 rounded-lg text-gray-600 pl-2 focus-within:ring-1 focus-within:ring-green-500 w-1/4">
                                <Search className="w-6 h-6 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search user"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="focus:outline-none p-2"
                                />
                            </div>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-lg text-black font-semibold">Sl No.</TableHead>
                                    <TableHead className="text-lg text-black font-semibold">Name</TableHead>
                                    <TableHead className="text-lg text-black font-semibold">Email</TableHead>
                                    <TableHead className="text-lg text-black font-semibold">Token Count</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentUsers.length > 0 ? (
                                    currentUsers.map((user: any, index: number) => (
                                        <TableRow key={user._id}>
                                            <TableCell className="text-black">{indexOfFirstUser + index + 1}</TableCell>
                                            <TableCell className="text-black">{user.firstName} {user.lastName}</TableCell>
                                            <TableCell className="text-black">{user.email}</TableCell>
                                            <TableCell className="text-black">
                                                <div className="flex flex-row items-center justify-center gap-2">
                                                    <Coins className="w-4 h-4" />
                                                    {user.tokenCount}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center text-black">
                                            No users found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        {/* Pagination Buttons */}
                        <div className="flex justify-end gap-2 mt-4">
                            <Button
                                onClick={prevPage}
                                disabled={currentPage === 1}
                                className="bg-green-500 hover:bg-green-600 text-white gap-1"
                            >
                                <MoveLeftIcon />
                                Previous
                            </Button>
                            <Button
                                onClick={nextPage}
                                disabled={indexOfLastUser >= filteredUsers.length}
                                className="bg-green-500 hover:bg-green-600 text-white gap-1"
                            >
                                Next
                                <MoveRight />
                            </Button>
                        </div>
                    </div>
                    <AddProject isOpen={isModalOpen} toggleModal={toggleModal} onAddProject={setProjectData} />
                </main>
            </div>
        </div>
    );
}

function Package2Icon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
            <path d="M12 3v6" />
        </svg>
    );
}
