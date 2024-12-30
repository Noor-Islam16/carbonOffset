import { useEffect, useState } from "react";
import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import AdminSidebar from "../components/AdminSidebar";
import { getAdminData } from "../api/admin";
import { FaArrowUp } from "react-icons/fa6";
import { Briefcase, Eye, FileText, Users, Menu, Mail } from "lucide-react";
import SmoothScroll from "../components/SmoothScroll";
import { getProposalData } from "../api/proposal";
import ViewProposal from "../components/ViewProposal";

export default function AdminProposal() {
  const [dashBoardData, setDashBoardData] = useState<any>([]);
  const [proposalData, setProposalData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await getAdminData();
        setDashBoardData(res.data);
      } catch (error) {
        console.error("Failed to fetch admin data", error);
      }
    };

    const fetchProposalData = async () => {
      try {
        const res = await getProposalData();
        if (res.data && res.data.data) {
          setProposalData(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch proposal data", error);
      }
    };

    fetchAdminData();
    fetchProposalData();
  }, []);

  const handleViewDocument = (proposal: any) => {
    setSelectedProposal(proposal);
    setIsModalOpen(true);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Mobile Card Component for proposal data
  const ProposalCard = ({ item }: { item: any }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-gray-800">
              {`${item.firstName} ${item.lastName}` || "N/A"}
            </div>
            <Button
              onClick={() => handleViewDocument(item)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
              size="sm"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="h-4 w-4" />
            <span className="text-sm break-all">{item.email || "N/A"}</span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                item.isNeedFund
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {item.isNeedFund ? "Funding Required" : "No Funding Required"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed lg:fixed w-[280px] h-full z-50 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 border-r bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800`}
        >
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <div className="lg:pl-[280px]">
          {/* Header */}
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6 shadow-sm">
            <Button
              variant="ghost"
              className="lg:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-base md:text-lg font-bold truncate">
              Proposal Management
            </h1>
          </header>

          <main className="p-4 md:p-6 max-w-[1600px] mx-auto">
            {/* Stats Cards */}
            <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6">
              {/* Total Users Card */}
              <Card className="transform transition-all duration-300 hover:scale-105 bg-gradient-to-br from-emerald-400 to-green-500 text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm md:text-md font-bold text-white">
                    Total Users
                  </CardTitle>
                  <Users className="h-5 w-5 md:h-6 md:w-6 opacity-75" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl md:text-2xl font-bold text-white">
                    {dashBoardData?.totalUsers || 0}
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs md:text-sm">
                    <FaArrowUp />
                    <span>
                      {Math.abs(dashBoardData?.percentageUserIncrease) || 0}% vs
                      last month
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Total Proposals Card */}
              <Card className="transform transition-all duration-300 hover:scale-105 bg-gradient-to-r from-[#8555C1] to-[#B469FF] text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm md:text-md font-bold text-white">
                    Total Proposals
                  </CardTitle>
                  <FileText className="h-5 w-5 md:h-6 md:w-6 opacity-75" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl md:text-2xl font-bold text-white">
                    {proposalData?.length || 0}
                  </div>
                  <div className="mt-2 text-xs md:text-sm opacity-75">
                    Submitted proposals
                  </div>
                </CardContent>
              </Card>

              {/* Active Projects Card */}
              <Card className="transform transition-all duration-300 hover:scale-105 bg-gradient-to-r from-[#DB20C4] to-[#F86893] text-white sm:col-span-2 lg:col-span-1">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm md:text-md font-bold text-white">
                    Active Projects
                  </CardTitle>
                  <Briefcase className="h-5 w-5 md:h-6 md:w-6 opacity-75" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl md:text-2xl font-bold text-white">
                    {dashBoardData?.totalProjects || 0}
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs md:text-sm">
                    <FaArrowUp />
                    <span>
                      {Math.floor(
                        Math.abs(dashBoardData?.projectCountPerMonth || 0)
                      )}
                      % vs last month
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Proposals Section */}
            <Card className="shadow-lg">
              <CardHeader className="border-b bg-gray-50/50 p-4 md:p-6">
                <h2 className="font-bold text-xl md:text-2xl text-gray-800">
                  Proposal Management
                </h2>
              </CardHeader>

              <div className="p-4 md:p-6">
                {isSmallScreen ? (
                  // Mobile view - Cards
                  <div className="space-y-4">
                    {proposalData && proposalData.length > 0 ? (
                      proposalData.map((item) => (
                        <ProposalCard key={item._id} item={item} />
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No proposals available
                      </div>
                    )}
                  </div>
                ) : (
                  // Desktop view - Table
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="text-base md:text-lg font-semibold text-gray-700 min-w-[150px]">
                              Name
                            </TableHead>
                            <TableHead className="text-base md:text-lg font-semibold text-gray-700 min-w-[200px]">
                              Email
                            </TableHead>
                            <TableHead className="text-base md:text-lg font-semibold text-gray-700 min-w-[150px]">
                              Funding Need
                            </TableHead>
                            <TableHead className="text-base md:text-lg font-semibold text-gray-700">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {proposalData && proposalData.length > 0 ? (
                            proposalData.map((item) => (
                              <TableRow
                                key={item._id}
                                className="hover:bg-gray-50 transition-colors duration-200"
                              >
                                <TableCell className="font-medium text-sm md:text-base text-gray-800">
                                  {`${item.firstName} ${item.lastName}` ||
                                    "N/A"}
                                </TableCell>
                                <TableCell className="text-sm md:text-base text-gray-600">
                                  {item.email || "N/A"}
                                </TableCell>
                                <TableCell>
                                  <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                      item.isNeedFund
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-gray-100 text-gray-800"
                                    }`}
                                  >
                                    {item.isNeedFund
                                      ? "Required"
                                      : "Not Required"}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <Button
                                    onClick={() => handleViewDocument(item)}
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                                    size="sm"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell
                                colSpan={4}
                                className="text-center py-8 text-gray-500"
                              >
                                No proposals available
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </main>
        </div>

        {/* Modal */}
        <ViewProposal
          isOpen={isModalOpen}
          toggleModal={() => setIsModalOpen(false)}
          selectedProposal={selectedProposal}
        />
      </div>
    </SmoothScroll>
  );
}
